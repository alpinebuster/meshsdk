import * as THREE from 'three';

import { UISelect, UIPanel, UIRow, UIInput, UIButton, UIColor, UICheckbox, UIInteger, UITextArea, UIText, UINumber } from './libs/ui.js';
import { UIBoolean } from './libs/ui.three.js';

import { AddObjectCommand } from './commands/AddObjectCommand.js';
import { RemoveObjectCommand } from './commands/RemoveObjectCommand.js';
import { SetUuidCommand } from './commands/SetUuidCommand.js';
import { SetValueCommand } from './commands/SetValueCommand.js';
import { SetPositionCommand } from './commands/SetPositionCommand.js';
import { SetRotationCommand } from './commands/SetRotationCommand.js';
import { SetScaleCommand } from './commands/SetScaleCommand.js';
import { SetColorCommand } from './commands/SetColorCommand.js';
import { SetShadowValueCommand } from './commands/SetShadowValueCommand.js';

import { SidebarObjectAnimation } from './Sidebar.Object.Animation.js';
import createMemoryViewFromGeometry, { showMesh } from './Utils.js';

function SidebarObject( editor ) {
	const strings = editor.strings;
	const selector = editor.selector;
	const signals = editor.signals;
	const camera = editor.camera;

	const container = new UIPanel();
	container.setBorderTop( '0' );
	container.setPaddingTop( '20px' );
	container.setDisplay( 'none' );

	let TOOL_MODE = 'none';

	// type

	const objectTypeRow = new UIRow();
	const objectType = new UIText();

	objectTypeRow.add( new UIText( strings.getKey( 'sidebar/object/type' ) ).setClass( 'Label' ) );
	objectTypeRow.add( objectType );

	container.add( objectTypeRow );

	// uuid

	const objectUUIDRow = new UIRow();
	const objectUUID = new UIInput().setWidth( '102px' ).setFontSize( '12px' ).setDisabled( true );
	const objectUUIDRenew = new UIButton( strings.getKey( 'sidebar/object/new' ) ).setMarginLeft( '7px' ).onClick( function () {
		objectUUID.setValue( THREE.MathUtils.generateUUID() );

		editor.execute( new SetUuidCommand( editor, editor.selected, objectUUID.getValue() ) );
	} );

	objectUUIDRow.add( new UIText( strings.getKey( 'sidebar/object/uuid' ) ).setClass( 'Label' ) );
	objectUUIDRow.add( objectUUID );
	objectUUIDRow.add( objectUUIDRenew );

	container.add( objectUUIDRow );

	// name

	const objectNameRow = new UIRow();
	const objectName = new UIInput().setWidth( '150px' ).setFontSize( '12px' ).onChange( function () {
		editor.execute( new SetValueCommand( editor, editor.selected, 'name', objectName.getValue() ) );
	} );

	objectNameRow.add( new UIText( strings.getKey( 'sidebar/object/name' ) ).setClass( 'Label' ) );
	objectNameRow.add( objectName );

	container.add( objectNameRow );

	// position

	const objectPositionRow = new UIRow();
	const objectPositionX = new UINumber().setPrecision( 3 ).setWidth( '50px' ).onChange( update );
	const objectPositionY = new UINumber().setPrecision( 3 ).setWidth( '50px' ).onChange( update );
	const objectPositionZ = new UINumber().setPrecision( 3 ).setWidth( '50px' ).onChange( update );

	objectPositionRow.add( new UIText( strings.getKey( 'sidebar/object/position' ) ).setClass( 'Label' ) );
	objectPositionRow.add( objectPositionX, objectPositionY, objectPositionZ );

	container.add( objectPositionRow );

	// rotation

	const objectRotationRow = new UIRow();
	const objectRotationX = new UINumber().setStep( 10 ).setNudge( 0.1 ).setUnit( '°' ).setWidth( '50px' ).onChange( update );
	const objectRotationY = new UINumber().setStep( 10 ).setNudge( 0.1 ).setUnit( '°' ).setWidth( '50px' ).onChange( update );
	const objectRotationZ = new UINumber().setStep( 10 ).setNudge( 0.1 ).setUnit( '°' ).setWidth( '50px' ).onChange( update );

	objectRotationRow.add( new UIText( strings.getKey( 'sidebar/object/rotation' ) ).setClass( 'Label' ) );
	objectRotationRow.add( objectRotationX, objectRotationY, objectRotationZ );

	container.add( objectRotationRow );

	// scale

	const objectScaleRow = new UIRow();
	const objectScaleX = new UINumber( 1 ).setPrecision( 3 ).setWidth( '50px' ).onChange( update );
	const objectScaleY = new UINumber( 1 ).setPrecision( 3 ).setWidth( '50px' ).onChange( update );
	const objectScaleZ = new UINumber( 1 ).setPrecision( 3 ).setWidth( '50px' ).onChange( update );

	objectScaleRow.add( new UIText( strings.getKey( 'sidebar/object/scale' ) ).setClass( 'Label' ) );
	objectScaleRow.add( objectScaleX, objectScaleY, objectScaleZ );

	container.add( objectScaleRow );

	// Reset Actions
	
	const objectResetRow = new UIRow();
	let objectActions = new UISelect().setFontSize( '11px' );
	objectActions.setOptions( {
		'Actions': 'Actions',
		'Reset Position': 'Reset Position',
		'Reset Rotation': 'Reset Rotation',
		'Reset Scale': 'Reset Scale'
	});
	objectActions.setValue( 'Actions' );
	objectActions.onClick( function ( event ) {
		event.stopPropagation(); // Avoid panel collapsing
	} );
	objectActions.onChange( function ( event ) {
		let object = editor.selected;

		switch ( this.getValue() ) {
			case 'Reset Position':
				editor.execute( new SetPositionCommand( editor, object, new THREE.Vector3( 0, 0, 0 ) ) );
				break;

			case 'Reset Rotation':
				editor.execute( new SetRotationCommand( editor, object, new THREE.Euler( 0, 0, 0 ) ) );
				break;

			case 'Reset Scale':
				editor.execute( new SetScaleCommand( editor, object, new THREE.Vector3( 1, 1, 1 ) ) );
				break;
		}

		this.setValue( 'Actions' );
	});

	objectResetRow.add( new UIText( strings.getKey( 'sidebar/object/reset' ) ).setClass( 'Label' ) );
	objectResetRow.add(objectActions);

	container.add( objectResetRow );

	// wasm

	const wasmOpsRow = new UIRow();

	let selectorEnabled = false;
	let _cur_intersect = null;
	let draggingIndex = -1;
	const clicked = [];
	const pointMaterial = new THREE.PointsMaterial({ color: 0xff0000, size: 3 });
	let pointGeo = new THREE.BufferGeometry();
	const pointCloud = new THREE.Points( pointGeo, pointMaterial );
	pointCloud.name = 'wasm-selector-point';

	const curveMaterial = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
	let curveLine = new THREE.Line( new THREE.BufferGeometry(), curveMaterial );
	curveLine.name = 'wasm-selector-curve';


	///
	const selectorWasmResults = [];
	const betweenWasmResults = [];
	///


	const wasmOpSelector = new UIButton( strings.getKey( 'sidebar/object/wasmOpSelector') ).setMarginLeft( '7px' ).onClick(function () {
		if ( !editor.selected ) return;

		if ( selectorEnabled ) {
			TOOL_MODE = 'none';
			wasmOpSelector.removeClass( 'selected' );

			if ( editor.selected.children.length > 0 ) {
				const subMeshes = editor.selected.children.filter( child => child.isLine || child.isPoints );
				subMeshes.forEach( ( subMesh, i ) => {
					editor.execute( new RemoveObjectCommand( editor, subMesh ) );
				});
			}
		} else {
			TOOL_MODE = 'wasmOpSelector';
			wasmOpSelector.addClass( 'selected' );

			_cur_intersect = null;
			draggingIndex = -1;
			clicked.length = 0;
			draggingIndex = -1;
			pointGeo.dispose();
			pointGeo = new THREE.BufferGeometry();
			curveLine.geometry.dispose();
			curveLine.geometry = new THREE.BufferGeometry();
		}

		selectorEnabled = !selectorEnabled;
	});
	signals.intersectionsDetected.add( ( intersects, source, event ) => {
		if ( (TOOL_MODE == 'wasmOpSelector' || TOOL_MODE == 'wasmOpSegmentByPoints') && intersects.length > 0 ) {
			// 1. Check if you clicked on a point
			const intersectedPoints = selector.getPointerIntersect( source.position, camera, pointCloud );
			if ( intersectedPoints.length > 0 ) {
				const idx = intersectedPoints[0].index;
				if ( event.altKey ) {
					clicked.splice( idx, 1 );
					refreshPoints();
					refreshCurve();
				} else {
					draggingIndex = idx;
				}

				return;
			}
			
        	// 2. No point intersected → check mesh surface
			const _intersected_object = intersects[ 0 ].object;
			if ( editor.selected !== _intersected_object ) return;

			if ( _intersected_object.userData.object !== undefined ) {
				_cur_intersect = _intersected_object.userData.object;
			} else {
				_cur_intersect = _intersected_object;
			}

			clicked.push( editor.selected.worldToLocal( intersects[0].point.clone() ) );
			// console.log("pts: ", clicked);

			refreshPoints();
			refreshCurve();
		}
	});
	signals.mouseMoving.add( ( onMovingPosition, event ) => {
        if ( draggingIndex < 0 ) return;
		// console.log("onMovingPosition: ", onMovingPosition);
		const intersects = selector.getPointerIntersects( onMovingPosition, camera );
		if ( intersects.length > 0 ) {
			const intersect = intersects[ 0 ];

			clicked[draggingIndex] = editor.selected.worldToLocal( intersect.point.clone() );
			// console.log("intersect: ", intersect);
			refreshPoints();
			refreshCurve();
		}
	});
	signals.mouseUp.add( ( onUpPosition, event ) => {
		draggingIndex = -1;
	});
	signals.keyDown.add( ( event ) => {
		if ( event.code == 'Enter' && editor.selected ) {
			const currentUUID = editor.selected.uuid;
			if ( currentUUID ) {
				const { verticesPtr, jsVertices, indicesPtr, jsIndices } = createMemoryViewFromGeometry( editor, editor.selected.geometry );
				const mesh = editor.MeshSDK.Mesh.fromTrianglesMemoryView( jsVertices, jsIndices, true );

				switch ( TOOL_MODE ) {
					case 'wasmOpSelector':
						///
						const positionAttribute = curveLine.geometry.getAttribute( 'position' );
						const positions = positionAttribute.array; // Float32Array
						const positionsArr = [...positions];
						// Convert to std::vector<float>
						const floatVec = new editor.MeshSDK.StdVectorf();
						positionsArr.forEach( v => floatVec.push_back( v ) );
						///


						// const mp = new editor.MeshSDK.MeshPart( mesh );
						// const numComponents = editor.MeshSDK.getNumComponents( mp, editor.MeshSDK.FaceIncidence.PerEdge, null );
						

						///
						const result = editor.MeshSDK.cutMeshByContourImpl( mesh, floatVec );
						selectorWasmResults.push(result.smallerMesh);
						///


						///
						// const smallerG = editor.MeshSDK.exportGeometryBuffer( result.smallerMesh );
						// const largerG = editor.MeshSDK.exportGeometryBuffer( result.largerMesh );
						// showMesh( result.smallerMesh, smallerG.vertices, smallerG.indices );
						// showMesh( result.largerMesh, largerG.vertices, largerG.indices );


						// const mVertices = result.mesh.vertices;
						// const mIndices = result.mesh.indices;

						const smallerVertices = result.smallerMeshMV.vertices;
						const smallerIndices = result.smallerMeshMV.indices;

						const largerVertices = result.largerMeshMV.vertices;
						const largerIndices = result.largerMeshMV.indices;
						
						// showMesh( mesh, mVertices, mIndices );
						showMesh( result.smallerMesh, smallerVertices, smallerIndices );
						showMesh( result.largerMesh, largerVertices, largerIndices );
						///


						///
						floatVec.delete();
						///
						break;

					case 'wasmOpSegmentByPoints':
						const threeWorldDir = new THREE.Vector3();
						editor.camera.getWorldDirection( threeWorldDir );
						const upDirArr = [
							threeWorldDir.x,
							threeWorldDir.y,
							threeWorldDir.z,
						]

						const positionAttr = pointGeo.getAttribute( 'position' );
						const posi = positionAttr.array;
						const posiArr = [...posi];
						const _pointArr = new editor.MeshSDK.StdVectorf();
						const _dirArr = new editor.MeshSDK.StdVectorf();
													
						for (let val of posiArr) {
							_pointArr.push_back(val);
						}			
						for (let val_ of upDirArr) {
							_dirArr.push_back(val_);
						}

						const metric = editor.MeshSDK.edgeCurvMetric( mesh, 2.0, 0.0 );
						const result_ = editor.MeshSDK.segmentByPointsImpl( mesh, metric, _pointArr, _dirArr );


						betweenWasmResults.push(result_.smallerMesh);
						betweenWasmResults.push(result_.largerMesh);


						const smallerVertices_ = result_.smallerMeshMV.vertices;
						const smallerIndices_ = result_.smallerMeshMV.indices;
						showMesh( result_.mesh, smallerVertices_, smallerIndices_ );

						const largerVertices_ = result_.largerMeshMV.vertices;
						const largerIndices_ = result_.largerMeshMV.indices;
						showMesh( result_.mesh, largerVertices_, largerIndices_ );
						

						_pointArr.delete();
						_dirArr.delete();
						break;
				}

				/// IMPORTANT!!!
				editor.MeshSDK._free( verticesPtr );
				editor.MeshSDK._free( indicesPtr );
			}
		}
	});
	function refreshPoints() {
		// DO NOT use this, because he bottom of Three.js' `BufferGeometry` is fixed-length,
		// and when `setFromPoints(clicked)` has more new points than the original,
		// Three.js can't automatically expand the size of the buffer that already exists.
		//
		// pointGeo.setFromPoints(clicked);
		//
		pointGeo.dispose();
		pointGeo = new THREE.BufferGeometry().setFromPoints( clicked );
		pointGeo.attributes.position.needsUpdate = true;
		pointCloud.geometry = pointGeo;

		if ( clicked.length == 1 ) {
			editor.execute( new AddObjectCommand( editor, pointCloud, editor.selected ) );
		}
	}
	function refreshCurve() {
		if ( clicked.length >= 2 ) {
			const curve = new THREE.CatmullRomCurve3( clicked, clicked.length > 2 );
			// const curve = new THREE.CatmullRomCurve3( clicked );
			// Sample a number of points on the curve and then fit the surface
			const pts = curve.getPoints( clicked.length * 6 );

			// Nearest point lookup
			const projectedSurfacePts = pts.map( p => {
				const target = new THREE.Vector3();
				_cur_intersect.geometry.boundsTree.closestPointToPoint( p, target );

				return target.point.clone();
			});

			curveLine.geometry.dispose();
			curveLine.geometry = new THREE.BufferGeometry().setFromPoints( projectedSurfacePts );
		}
		if ( clicked.length == 2 ) {
			editor.execute( new AddObjectCommand( editor, curveLine, editor.selected ) );
		}
	}

	const wasmOpFillholes = new UIButton( strings.getKey( 'sidebar/object/wasmFillholes') ).setMarginLeft( '7px' ).onClick(function () {
		const currentUUID = editor.selected.uuid;
		if ( currentUUID ) {
			const { verticesPtr, jsVertices, indicesPtr, jsIndices } = createMemoryViewFromGeometry( editor, editor.selected.geometry );
			const mesh = editor.MeshSDK.Mesh.fromTrianglesMemoryView( jsVertices, jsIndices, true );
	
			const newMeshData = mesh.fillAllHolesImpl();

			const newVertices = newMeshData.meshMV.vertices;
			const newIndices = newMeshData.meshMV.indices;
			showMesh( newMeshData.mesh, newVertices, newIndices );

			editor.MeshSDK._free( verticesPtr );
			editor.MeshSDK._free( indicesPtr );
		}
	} );
	const wasmOpSelectedInverter = new UIButton( strings.getKey( 'sidebar/object/wasmOpSelectedInverter') ).setMarginLeft( '7px' ).onClick(function () {
		if ( !editor.selected ) return;
	});
	const wasmOpSelectedDeleter = new UIButton( strings.getKey( 'sidebar/object/wasmOpSelectedDeleter') ).setMarginLeft( '7px' ).onClick(function () {
		if ( !editor.selected ) return;
	});

	const wasmOpFixUndercuts = new UIButton( strings.getKey( 'sidebar/object/wasmOpFixUndercuts') ).setMarginLeft( '7px' ).onClick(function () {
		if ( !editor.selected ) return;

		const currentUUID = editor.selected.uuid;
		if ( currentUUID ) {
			const { verticesPtr, jsVertices, indicesPtr, jsIndices } = createMemoryViewFromGeometry( editor, editor.selected.geometry );
			const mesh = editor.MeshSDK.Mesh.fromTrianglesMemoryView( jsVertices, jsIndices, true );
	
			const threeWorldDir = new THREE.Vector3();
			editor.camera.getWorldDirection( threeWorldDir );
			const upDir = new editor.MeshSDK.Vector3f(
				-threeWorldDir.x,
				-threeWorldDir.y,
				-threeWorldDir.z,
			)

			const result = editor.MeshSDK.fixUndercutsImpl( mesh, upDir, 0.0, 0.0 );
	
			const newVertices = result.meshMV.vertices;
			// NOTE: It will work but there is no need to wrap `Uint32Array` again!
			// const newIndices = new Uint32Array( result.meshMV.indices );
			const newIndices = result.meshMV.indices;
			showMesh( result.mesh, newVertices, newIndices );
	
			editor.MeshSDK._free( verticesPtr );
			editor.MeshSDK._free( indicesPtr );
		}
	});

	let segmentByPointsEnabled = false;
	const wasmOpSegmentByPoints = new UIButton( strings.getKey( 'sidebar/object/wasmOpSegmentByPoints') ).setMarginLeft( '7px' ).onClick( function () {
		if ( !editor.selected ) return;

		if ( segmentByPointsEnabled ) {
			TOOL_MODE = 'none';
			wasmOpSegmentByPoints.removeClass( 'selected' );

			if ( editor.selected.children.length > 0 ) {
				const subMeshes = editor.selected.children.filter( child => child.isLine || child.isPoints );
				subMeshes.forEach( ( subMesh, i ) => {
					editor.execute( new RemoveObjectCommand( editor, subMesh ) );
				});
			}
		} else {
			TOOL_MODE = 'wasmOpSegmentByPoints';
			wasmOpSegmentByPoints.addClass( 'selected' );
			
			_cur_intersect = null;
			clicked.length = 0;
			pointGeo.dispose();
			pointGeo = new THREE.BufferGeometry();
		}

		segmentByPointsEnabled = !segmentByPointsEnabled;
	});

	const wasmOpThickenMesh = new UIButton( strings.getKey( 'sidebar/object/wasmOpThickenMesh') ).setMarginLeft( '7px' ).onClick( function () {
		if ( !editor.selected ) return;

		const currentUUID = editor.selected.uuid;
		if ( currentUUID ) {
			const { verticesPtr, jsVertices, indicesPtr, jsIndices } = createMemoryViewFromGeometry( editor, editor.selected.geometry );
			const mesh = editor.MeshSDK.Mesh.fromTrianglesMemoryView( jsVertices, jsIndices, true );
	
			const params = new editor.MeshSDK.GeneralOffsetParameters();
			params.signDetectionMode = editor.MeshSDK.SignDetectionMode.Unsigned;
			const meshPart = new editor.MeshSDK.MeshPart( mesh );
			params.voxelSize = editor.MeshSDK.suggestVoxelSize( meshPart, 5e6 );

			// const mp = new editor.MeshSDK.MeshPart( mesh );
			// const resultExpected = editor.MeshSDK.offsetOneDirection( mp, 1.2, params );
			// const resultWasmMesh = resultExpected.value();

			const result = editor.MeshSDK.thickenMeshWithTensionImpl( mesh, 1.2, true, 1.2, params );
			// const resultExpected = editor.MeshSDK.thickenMesh( mesh, 1.2, params );

			// const result = editor.MeshSDK.exportMeshMemoryView(resultWasmMesh);
			
			const newVertices = result.meshMV.vertices;
			const newIndices = result.meshMV.indices;
			// const newVertices = result.vertices;
			// const newIndices = result.indices;
			showMesh( result.mesh, newVertices, newIndices );

			editor.MeshSDK._free( verticesPtr );
			editor.MeshSDK._free( indicesPtr );
		}
	});
	const wasmOpThickenBites = new UIButton( strings.getKey( 'sidebar/object/wasmOpThickenBites') ).setMarginLeft( '7px' ).onClick( function () {
		if ( !editor.selected ) return;

		const currentUUID = editor.selected.uuid;
		if ( currentUUID && selectorWasmResults.length >=2 ) {
			const inflateSettings = {
				pressure: 0,
				iterations: 1,
				preSmooth: true,
				gradualPressureGrowth: true
			};


			const selectorWasmResults_0_ch = editor.MeshSDK.makeConvexHull(selectorWasmResults[0]);
			const result_0 = editor.MeshSDK.exportMeshMemoryView( selectorWasmResults_0_ch );
			const newVertices_0 = result_0.vertices;
			const newIndices_0 = result_0.indices;
			showMesh( selectorWasmResults_0_ch, newVertices_0, newIndices_0 );

			const selectorWasmResults_1_ch = editor.MeshSDK.makeConvexHull(selectorWasmResults[1]);
			const result_1 = editor.MeshSDK.exportMeshMemoryView( selectorWasmResults_1_ch );
			const newVertices_1 = result_1.vertices;
			const newIndices_1 = result_1.indices;
			showMesh( selectorWasmResults_1_ch, newVertices_1, newIndices_1 );



			const meshAB = new editor.MeshSDK.Mesh();
			meshAB.addMesh(selectorWasmResults[0], null, null, null, false);
			meshAB.addMesh(selectorWasmResults[1], null, null, null, false);
			meshAB.topology.flipOrientation( null );

			const curMeshThree = editor.MeshSDK.exportMeshMemoryView( meshAB );
			const curMeshThreeVertices = curMeshThree.vertices;
			const curMeshThreeIndices = curMeshThree.indices;
			showMesh( meshAB, curMeshThreeVertices, curMeshThreeIndices );



			const fillHoleMetric = editor.MeshSDK.getCircumscribedMetric(meshAB);
			const result = editor.MeshSDK.generateOrthodonticBiteWithFillHoleMetricImpl( 
				meshAB, 
				6,
				1.9,
				inflateSettings, 
				fillHoleMetric 
			);

			// const offsetParams = new editor.MeshSDK.GeneralOffsetParameters();
			// const result = editor.MeshSDK.generateOrthodonticBiteImpl( 
			// 	selectorWasmResults[0], selectorWasmResults[1],
			// 	0,
			// 	6,
			// 	1.9,
			// 	inflateSettings, 
			// 	offsetParams 
			// );

			// result.mesh.topology.flipOrientation( null );

			const newVertices = result.meshMV.vertices;
			const newIndices = result.meshMV.indices;
			showMesh( result.mesh, newVertices, newIndices );


			///
			const cb = new editor.MeshSDK.ProgressCallback.create(function(progress) {
				console.log("Progress:", progress);
				return true;
			});
			const booleanResult = editor.MeshSDK.boolean(result.mesh, selectorWasmResults_1_ch, editor.MeshSDK.BooleanOperation.DifferenceAB, null, null, cb);
			const boolean_result = editor.MeshSDK.exportMeshMemoryView( booleanResult.mesh );
			const newBooleanVertices = boolean_result.vertices;
			const newBooleanIndices = boolean_result.indices;
			showMesh( booleanResult.mesh, newBooleanVertices, newBooleanIndices );
			///


			// selectorWasmResults[0].delete();
			// selectorWasmResults[1].delete();
		}
	});
	const wasmOpBuildBetweenHoles = new UIButton( strings.getKey( 'sidebar/object/wasmOpBuildBetweenHoles') ).setMarginLeft( '7px' ).onClick( function () {
		if ( !editor.selected ) return;

		const currentUUID = editor.selected.uuid;
		if ( currentUUID && betweenWasmResults.length >=2 ) {
			const inflateSettings = {
				pressure: 1.2,
				iterations: 1,
				preSmooth: true,
				gradualPressureGrowth: true
			};


			const { verticesPtr, jsVertices, indicesPtr, jsIndices } = createMemoryViewFromGeometry( editor, editor.selected.geometry );
			const toothWasmMesh = editor.MeshSDK.Mesh.fromTrianglesMemoryView( jsVertices, jsIndices, true );
			betweenWasmResults[0].delete();
			betweenWasmResults[0] = null;
			betweenWasmResults[0] = toothWasmMesh;

			const meshAB = new editor.MeshSDK.Mesh();
			meshAB.addMesh(betweenWasmResults[0], null, null, null, false);
			meshAB.addMesh(betweenWasmResults[1], null, null, null, false);
			// meshAB.topology.flipOrientation( null );


			const fillHoleMetric = editor.MeshSDK.getCircumscribedMetric(meshAB);
			const result = editor.MeshSDK.buildCylinderBetweenTwoHolesImpl( 
				meshAB,
				inflateSettings, 
				fillHoleMetric 
			);

			const newVertices = result.meshMV.vertices;
			const newIndices = result.meshMV.indices;
			showMesh( result.mesh, newVertices, newIndices );


			editor.MeshSDK._free( verticesPtr );
			editor.MeshSDK._free( indicesPtr );
		}
	});

	const wasmOpLoadFromThreeJS = new UIButton( strings.getKey( 'sidebar/object/wasmOpLoadFromThreeJS') ).setMarginLeft( '7px' ).onClick( function () {
		if ( !editor.selected ) return;

		const currentUUID = editor.selected.uuid;
		if (currentUUID) {
			const { verticesPtr, jsVertices, indicesPtr, jsIndices } = createMemoryViewFromGeometry( editor, editor.selected.geometry );
			try {
				// Now `jsVertices.buffer === editor.MeshSDK.HEAPF32.buffer`
				const mesh = editor.MeshSDK.Mesh.fromTrianglesMemoryView( jsVertices, jsIndices, true );

				// const result = editor.MeshSDK.Mesh.getGeometry( mesh ); // ✅

				const mp = new editor.MeshSDK.MeshPart( mesh );
				const numComponents = editor.MeshSDK.getNumComponents( mp, editor.MeshSDK.FaceIncidence.PerEdge, null );

				///
				const threeWorldDir = new THREE.Vector3();
				editor.camera.getWorldDirection( threeWorldDir );
				const upDir = new editor.MeshSDK.Vector3f(
					-threeWorldDir.x,
					-threeWorldDir.y,
					-threeWorldDir.z,
				)
				// FIXME: Why using the returned `Mesh` instance is much slower?
				const result = editor.MeshSDK.fixUndercutsImpl( mesh, upDir, 0.0, 0.0 ); // ✅
				// const result = editor.MeshSDK.fixUndercutsImpl( mesh, upDir, 0.0, 0.0 ); // ✅
				///


				const newVertices = result.meshMV.vertices;
				const newIndices = result.meshMV.indices;
				showMesh( result.mesh, newVertices, newIndices );
			} catch ( error ) {
				console.error( 'Error creating from ThreeJS Mesh:', error.message );
			} finally {
				/// IMPORTANT！！！
				editor.MeshSDK._free( verticesPtr );
				editor.MeshSDK._free( indicesPtr );
				///
			}
		}
	});
	const wasmOpLoadFromThreeJSArray = new UIButton( strings.getKey( 'sidebar/object/wasmOpLoadFromThreeJSArray') ).setMarginLeft( '7px' ).onClick( function () {
		if ( !editor.selected ) return;

		const currentUUID = editor.selected.uuid;
		if ( currentUUID ) {
			const geometry = editor.selected.geometry;
			const vertices = geometry.getAttribute( 'position' ).array; // `Float32Array`
			const indices = geometry.getIndex().array; // `Uint32Array`

			try {
				const mesh = editor.MeshSDK.Mesh.fromTrianglesMemoryView( vertices, indices, true );

				const mp = new editor.MeshSDK.MeshPart( mesh.mesh );
				const numComponents = editor.MeshSDK.getNumComponents( mp, editor.MeshSDK.FaceIncidence.PerEdge, null );

				///
				const threeWorldDir = new THREE.Vector3();
				editor.camera.getWorldDirection( threeWorldDir );
				const upDir = new editor.MeshSDK.Vector3f(
					-threeWorldDir.x,
					-threeWorldDir.y,
					-threeWorldDir.z,
				)
				const result = editor.MeshSDK.fixUndercutsImpl( mesh.mesh, upDir, 0.0, 0.0 );
				///


				const newVertices = result.meshMV.vertices;
				const newIndices = result.meshMV.indices;

				showMesh( result.mesh, newVertices, newIndices );
			} catch ( error ) {
				console.error( 'Error creating from ThreeJS Mesh:', error.message );
			}
		}
	});

	const wasmOpFindSilhouetteEdges = new UIButton( strings.getKey( 'sidebar/object/wasmOpFindSilhouetteEdges') ).setMarginLeft( '7px' ).onClick( function () {
		if ( !editor.selected ) return;

		const currentUUID = editor.selected.uuid;
		if ( currentUUID ) {
			const { verticesPtr, jsVertices, indicesPtr, jsIndices } = createMemoryViewFromGeometry( editor, editor.selected.geometry );

			try {
				const mesh = editor.MeshSDK.Mesh.fromTrianglesMemoryView( jsVertices, jsIndices, true );

				///
				const threeWorldDir = new THREE.Vector3();
				editor.camera.getWorldDirection( threeWorldDir );
				const upDir = new editor.MeshSDK.Vector3f(
					-threeWorldDir.x,
					-threeWorldDir.y,
					-threeWorldDir.z,
				)

				const projectedMesh = editor.MeshSDK.findLookingSilhouetteConvexHull( mesh, upDir );
				const result = editor.MeshSDK.exportMeshMemoryView( projectedMesh );
				///


				const newVertices = result.vertices;
				const newIndices = result.indices;
				showMesh( projectedMesh, newVertices, newIndices );
			} catch ( error ) {
				console.error( 'Error creating from ThreeJS Mesh:', error.message );
				editor.MeshSDK._free( verticesPtr );
				editor.MeshSDK._free( indicesPtr );
			}
		}
	});
	const wasmOpBuildMaxillaBottom = new UIButton( strings.getKey( 'sidebar/object/wasmOpBuildMaxillaBottom') ).setMarginLeft( '7px' ).onClick( function () {
		if ( !editor.selected ) return;

		const currentUUID = editor.selected.uuid;
		if ( currentUUID ) {
			const { verticesPtr, jsVertices, indicesPtr, jsIndices } = createMemoryViewFromGeometry( editor, editor.selected.geometry );

			try {
				const mesh = editor.MeshSDK.Mesh.fromTrianglesMemoryView( jsVertices, jsIndices, true );

				///
				const threeWorldDir = new THREE.Vector3();
				editor.camera.getWorldDirection( threeWorldDir );
				const upDir = new editor.MeshSDK.Vector3f(
					-threeWorldDir.x,
					-threeWorldDir.y,
					-threeWorldDir.z,
				)


				const bottomPosition = editor.MeshSDK.findBottomPosition( mesh, upDir );
				// const result = editor.MeshSDK.createMaxillaGypsumBaseImpl( 
				// 	mesh,
				// 	bottomPosition.maxAreaHole,
				// 	bottomPosition.minVert,
				// 	upDir,
				// 	0.0,
				// 	9.0,
				// );
				const result = editor.MeshSDK.createMaxillaGypsumBaseImpl( 
					mesh,
					bottomPosition.maxAreaHole,
					bottomPosition.minVert,
					upDir,
					0.0,
					9.0,
				);
				///


				const newVertices = result.meshMV.vertices;
				const newIndices = result.meshMV.indices;

				showMesh( mesh, newVertices, newIndices );
				showMesh( mesh, result.mMaxillaBaseCopyData.vertices, result.mMaxillaBaseCopyData.indices );
				showMesh( mesh, result.mMaxillaBaseTransformedCopyData.vertices, result.mMaxillaBaseTransformedCopyData.indices );
				showMesh( mesh, result.mMaxillaBaseTransformedExtendedHoleCopyData.vertices, result.mMaxillaBaseTransformedExtendedHoleCopyData.indices );
			} catch ( error ) {
				console.error( 'Error creating from ThreeJS Mesh:', error.message );
				editor.MeshSDK._free( verticesPtr );
				editor.MeshSDK._free( indicesPtr );
			}
		}
	});
	const wasmOpBuildMandibleBottom = new UIButton( strings.getKey( 'sidebar/object/wasmOpBuildMandibleBottom') ).setMarginLeft( '7px' ).onClick( function () {
		if ( !editor.selected ) return;

		const currentUUID = editor.selected.uuid;
		if ( currentUUID ) {
			const { verticesPtr, jsVertices, indicesPtr, jsIndices } = createMemoryViewFromGeometry( editor, editor.selected.geometry );

			try {
				const mesh = editor.MeshSDK.Mesh.fromTrianglesMemoryView( jsVertices, jsIndices, true );

				///
				const threeWorldDir = new THREE.Vector3();
				editor.camera.getWorldDirection( threeWorldDir );
				const upDir = new editor.MeshSDK.Vector3f(
					-threeWorldDir.x,
					-threeWorldDir.y,
					-threeWorldDir.z,
				)

				const bottomPosition = editor.MeshSDK.findBottomPosition( mesh, upDir );
				const result = editor.MeshSDK.createMandibleGypsumBaseImpl( 
					mesh,
					bottomPosition.maxAreaHole,
					upDir,
					0.0,
				);
				///


				const newVertices = result.meshMV.vertices;
				const newIndices = result.meshMV.indices;
				showMesh( mesh, newVertices, newIndices );
			} catch ( error ) {
				console.error( 'Error creating from ThreeJS Mesh:', error.message );
				editor.MeshSDK._free( verticesPtr );
				editor.MeshSDK._free( indicesPtr );
			}
		}
	});

	const wasmOpInflateToothRoot = new UIButton( strings.getKey( 'sidebar/object/wasmOpInflateToothRoot') ).setMarginLeft( '7px' ).onClick( function () {
		if ( !editor.selected ) return;

		const currentUUID = editor.selected.uuid;
		if ( currentUUID ) {
			const { verticesPtr, jsVertices, indicesPtr, jsIndices } = createMemoryViewFromGeometry( editor, editor.selected.geometry );

			try {
				const mesh = editor.MeshSDK.Mesh.fromTrianglesMemoryView( jsVertices, jsIndices, true );

				///
				const threeWorldDir = new THREE.Vector3();
				editor.camera.getWorldDirection( threeWorldDir );
				const upDir = new editor.MeshSDK.Vector3f(
					-threeWorldDir.x,
					-threeWorldDir.y,
					-threeWorldDir.z,
				)

				const inflateSettings = {
					pressure: 20,
					iterations: 1,
					preSmooth: true,
					gradualPressureGrowth: true
				};
				// const inflateSettings = new editor.MeshSDK.InflateSettings();
				// inflateSettings.pressure = 50;
				const result = editor.MeshSDK.inflateToothRootImpl( mesh, inflateSettings );
				///


				showMesh( mesh, result.meshMV.vertices, result.meshMV.indices );
				showMesh( mesh, result.rootMeshMV.vertices, result.rootMeshMV.indices );
			} catch ( error ) {
				console.error( 'Error creating from ThreeJS Mesh:', error.message );
				editor.MeshSDK._free( verticesPtr );
				editor.MeshSDK._free( indicesPtr );
			}
		}
	});
	const wasmOpMeshDir = new UIButton( strings.getKey( 'sidebar/object/wasmOpMeshDir') ).setMarginLeft( '7px' ).onClick( function () {
		if ( !editor.selected ) return;

		const currentUUID = editor.selected.uuid;
		if ( currentUUID ) {
			const { verticesPtr, jsVertices, indicesPtr, jsIndices } = createMemoryViewFromGeometry( editor, editor.selected.geometry );

			try {
				const mesh = editor.MeshSDK.Mesh.fromTrianglesMemoryView( jsVertices, jsIndices, true );

				const meshDir = mesh.dirArea( null );
				const dir = new THREE.Vector3(meshDir.x, meshDir.y, meshDir.z).normalize();

				const origin = new THREE.Vector3( 0, 0, 0 );
				const length = 30;
				const hex = 0xff0000;
				const arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );

				editor.execute( new AddObjectCommand( editor, arrowHelper, editor.selected ) );
			} catch ( error ) {
				console.error( 'Error creating from ThreeJS Mesh:', error.message );
				editor.MeshSDK._free( verticesPtr );
				editor.MeshSDK._free( indicesPtr );
			}
		}
	});

	wasmOpsRow.add( new UIText( strings.getKey( 'sidebar/object/wasm' ) ).setClass( 'Label' ) );

	const wasmOpsRowHole = new UIRow();
	wasmOpsRowHole.add( wasmOpFillholes );
	
	const wasmOpsRowSelector = new UIRow();
	wasmOpsRowSelector.add( wasmOpSelector );
	wasmOpsRowSelector.add( wasmOpSelectedInverter );
	wasmOpsRowSelector.add( wasmOpSelectedDeleter );

	const wasmOpsRowFixUndercuts = new UIRow();
	wasmOpsRowFixUndercuts.add( wasmOpFixUndercuts );
	wasmOpsRowFixUndercuts.add( wasmOpSegmentByPoints );
	
	const wasmOpsRowThicken = new UIRow();
	wasmOpsRowThicken.add( wasmOpThickenMesh );
	wasmOpsRowThicken.add( wasmOpThickenBites );
	wasmOpsRowThicken.add( wasmOpBuildBetweenHoles );
	
	const wasmOpsRowLoad = new UIRow();
	wasmOpsRowLoad.add( wasmOpLoadFromThreeJS );
	wasmOpsRowLoad.add( wasmOpLoadFromThreeJSArray );
	
	const wasmOpsRowGypsum = new UIRow();
	wasmOpsRowGypsum.add( wasmOpBuildMaxillaBottom );
	wasmOpsRowGypsum.add( wasmOpBuildMandibleBottom );
	wasmOpsRowGypsum.add( wasmOpFindSilhouetteEdges );

	const wasmOpsRowToothRoot = new UIRow();
	wasmOpsRowToothRoot.add( wasmOpInflateToothRoot );

	const wasmOpsRowMesh = new UIRow();
	wasmOpsRowMesh.add( wasmOpMeshDir );

	container.add( wasmOpsRow );
	container.add( wasmOpsRowLoad );
	container.add( wasmOpsRowHole );
	container.add( wasmOpsRowSelector );
	container.add( wasmOpsRowFixUndercuts );
	container.add( wasmOpsRowThicken );
	container.add( wasmOpsRowGypsum );
	container.add( wasmOpsRowToothRoot );
	container.add( wasmOpsRowMesh );

	// fov

	const objectFovRow = new UIRow();
	const objectFov = new UINumber().onChange( update );

	objectFovRow.add( new UIText( strings.getKey( 'sidebar/object/fov' ) ).setClass( 'Label' ) );
	objectFovRow.add( objectFov );

	container.add( objectFovRow );

	// left

	const objectLeftRow = new UIRow();
	const objectLeft = new UINumber().onChange( update );

	objectLeftRow.add( new UIText( strings.getKey( 'sidebar/object/left' ) ).setClass( 'Label' ) );
	objectLeftRow.add( objectLeft );

	container.add( objectLeftRow );

	// right

	const objectRightRow = new UIRow();
	const objectRight = new UINumber().onChange( update );

	objectRightRow.add( new UIText( strings.getKey( 'sidebar/object/right' ) ).setClass( 'Label' ) );
	objectRightRow.add( objectRight );

	container.add( objectRightRow );

	// top

	const objectTopRow = new UIRow();
	const objectTop = new UINumber().onChange( update );

	objectTopRow.add( new UIText( strings.getKey( 'sidebar/object/top' ) ).setClass( 'Label' ) );
	objectTopRow.add( objectTop );

	container.add( objectTopRow );

	// bottom

	const objectBottomRow = new UIRow();
	const objectBottom = new UINumber().onChange( update );

	objectBottomRow.add( new UIText( strings.getKey( 'sidebar/object/bottom' ) ).setClass( 'Label' ) );
	objectBottomRow.add( objectBottom );

	container.add( objectBottomRow );

	// near

	const objectNearRow = new UIRow();
	const objectNear = new UINumber().onChange( update );

	objectNearRow.add( new UIText( strings.getKey( 'sidebar/object/near' ) ).setClass( 'Label' ) );
	objectNearRow.add( objectNear );

	container.add( objectNearRow );

	// far

	const objectFarRow = new UIRow();
	const objectFar = new UINumber().onChange( update );

	objectFarRow.add( new UIText( strings.getKey( 'sidebar/object/far' ) ).setClass( 'Label' ) );
	objectFarRow.add( objectFar );

	container.add( objectFarRow );

	// intensity

	const objectIntensityRow = new UIRow();
	const objectIntensity = new UINumber().onChange( update );

	objectIntensityRow.add( new UIText( strings.getKey( 'sidebar/object/intensity' ) ).setClass( 'Label' ) );
	objectIntensityRow.add( objectIntensity );

	container.add( objectIntensityRow );

	// color

	const objectColorRow = new UIRow();
	const objectColor = new UIColor().onInput( update );

	objectColorRow.add( new UIText( strings.getKey( 'sidebar/object/color' ) ).setClass( 'Label' ) );
	objectColorRow.add( objectColor );

	container.add( objectColorRow );

	// ground color

	const objectGroundColorRow = new UIRow();
	const objectGroundColor = new UIColor().onInput( update );

	objectGroundColorRow.add( new UIText( strings.getKey( 'sidebar/object/groundcolor' ) ).setClass( 'Label' ) );
	objectGroundColorRow.add( objectGroundColor );

	container.add( objectGroundColorRow );

	// distance

	const objectDistanceRow = new UIRow();
	const objectDistance = new UINumber().setRange( 0, Infinity ).onChange( update );

	objectDistanceRow.add( new UIText( strings.getKey( 'sidebar/object/distance' ) ).setClass( 'Label' ) );
	objectDistanceRow.add( objectDistance );

	container.add( objectDistanceRow );

	// angle

	const objectAngleRow = new UIRow();
	const objectAngle = new UINumber().setPrecision( 3 ).setRange( 0, Math.PI / 2 ).onChange( update );

	objectAngleRow.add( new UIText( strings.getKey( 'sidebar/object/angle' ) ).setClass( 'Label' ) );
	objectAngleRow.add( objectAngle );

	container.add( objectAngleRow );

	// penumbra

	const objectPenumbraRow = new UIRow();
	const objectPenumbra = new UINumber().setRange( 0, 1 ).onChange( update );

	objectPenumbraRow.add( new UIText( strings.getKey( 'sidebar/object/penumbra' ) ).setClass( 'Label' ) );
	objectPenumbraRow.add( objectPenumbra );

	container.add( objectPenumbraRow );

	// decay

	const objectDecayRow = new UIRow();
	const objectDecay = new UINumber().setRange( 0, Infinity ).onChange( update );

	objectDecayRow.add( new UIText( strings.getKey( 'sidebar/object/decay' ) ).setClass( 'Label' ) );
	objectDecayRow.add( objectDecay );

	container.add( objectDecayRow );

	// shadow

	const objectShadowRow = new UIRow();

	objectShadowRow.add( new UIText( strings.getKey( 'sidebar/object/shadow' ) ).setClass( 'Label' ) );

	const objectCastShadow = new UIBoolean( false, strings.getKey( 'sidebar/object/cast' ) ).onChange( update );
	objectShadowRow.add( objectCastShadow );

	const objectReceiveShadow = new UIBoolean( false, strings.getKey( 'sidebar/object/receive' ) ).onChange( update );
	objectShadowRow.add( objectReceiveShadow );

	container.add( objectShadowRow );

	// shadow intensity

	const objectShadowIntensityRow = new UIRow();

	objectShadowIntensityRow.add( new UIText( strings.getKey( 'sidebar/object/shadowIntensity' ) ).setClass( 'Label' ) );

	const objectShadowIntensity = new UINumber( 0 ).setRange( 0, 1 ).onChange( update );
	objectShadowIntensityRow.add( objectShadowIntensity );

	container.add( objectShadowIntensityRow );

	// shadow bias

	const objectShadowBiasRow = new UIRow();

	objectShadowBiasRow.add( new UIText( strings.getKey( 'sidebar/object/shadowBias' ) ).setClass( 'Label' ) );

	const objectShadowBias = new UINumber( 0 ).setPrecision( 5 ).setStep( 0.0001 ).setNudge( 0.00001 ).onChange( update );
	objectShadowBiasRow.add( objectShadowBias );

	container.add( objectShadowBiasRow );

	// shadow normal offset

	const objectShadowNormalBiasRow = new UIRow();

	objectShadowNormalBiasRow.add( new UIText( strings.getKey( 'sidebar/object/shadowNormalBias' ) ).setClass( 'Label' ) );

	const objectShadowNormalBias = new UINumber( 0 ).onChange( update );
	objectShadowNormalBiasRow.add( objectShadowNormalBias );

	container.add( objectShadowNormalBiasRow );

	// shadow radius

	const objectShadowRadiusRow = new UIRow();

	objectShadowRadiusRow.add( new UIText( strings.getKey( 'sidebar/object/shadowRadius' ) ).setClass( 'Label' ) );

	const objectShadowRadius = new UINumber( 1 ).onChange( update );
	objectShadowRadiusRow.add( objectShadowRadius );

	container.add( objectShadowRadiusRow );

	// visible

	const objectVisibleRow = new UIRow();
	const objectVisible = new UICheckbox().onChange( update );

	objectVisibleRow.add( new UIText( strings.getKey( 'sidebar/object/visible' ) ).setClass( 'Label' ) );
	objectVisibleRow.add( objectVisible );

	container.add( objectVisibleRow );

	// frustumCulled

	const objectFrustumCulledRow = new UIRow();
	const objectFrustumCulled = new UICheckbox().onChange( update );

	objectFrustumCulledRow.add( new UIText( strings.getKey( 'sidebar/object/frustumcull' ) ).setClass( 'Label' ) );
	objectFrustumCulledRow.add( objectFrustumCulled );

	container.add( objectFrustumCulledRow );

	// renderOrder

	const objectRenderOrderRow = new UIRow();
	const objectRenderOrder = new UIInteger().setWidth( '50px' ).onChange( update );

	objectRenderOrderRow.add( new UIText( strings.getKey( 'sidebar/object/renderorder' ) ).setClass( 'Label' ) );
	objectRenderOrderRow.add( objectRenderOrder );

	container.add( objectRenderOrderRow );

	// user data

	const objectUserDataRow = new UIRow();
	const objectUserData = new UITextArea().setWidth( '150px' ).setHeight( '40px' ).setFontSize( '12px' ).onChange( update );
	objectUserData.onKeyUp( function () {
		try {
			JSON.parse( objectUserData.getValue() );

			objectUserData.dom.classList.add( 'success' );
			objectUserData.dom.classList.remove( 'fail' );
		} catch ( error ) {
			objectUserData.dom.classList.remove( 'success' );
			objectUserData.dom.classList.add( 'fail' );
		}
	} );

	objectUserDataRow.add( new UIText( strings.getKey( 'sidebar/object/userdata' ) ).setClass( 'Label' ) );
	objectUserDataRow.add( objectUserData );

	container.add( objectUserDataRow );

	// Export JSON

	const exportJson = new UIButton( strings.getKey( 'sidebar/object/export' ) );
	exportJson.setMarginLeft( '120px' );
	exportJson.onClick( function () {
		const object = editor.selected;

		let output = object.toJSON();

		try {
			output = JSON.stringify( output, null, '\t' );
			output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );
		} catch ( e ) {
			output = JSON.stringify( output );
		}

		editor.utils.save( new Blob( [ output ] ), `${ objectName.getValue() || 'object' }.json` );
	} );
	container.add( exportJson );

	// Animations

	container.add( new SidebarObjectAnimation( editor ) );

	//

	function update() {
		const object = editor.selected;

		if ( object !== null ) {
			const newPosition = new THREE.Vector3( objectPositionX.getValue(), objectPositionY.getValue(), objectPositionZ.getValue() );
			if ( object.position.distanceTo( newPosition ) >= 0.01 ) {
				editor.execute( new SetPositionCommand( editor, object, newPosition ) );
			}

			const newRotation = new THREE.Euler( objectRotationX.getValue() * THREE.MathUtils.DEG2RAD, objectRotationY.getValue() * THREE.MathUtils.DEG2RAD, objectRotationZ.getValue() * THREE.MathUtils.DEG2RAD );
			if ( new THREE.Vector3().setFromEuler( object.rotation ).distanceTo( new THREE.Vector3().setFromEuler( newRotation ) ) >= 0.01 ) {
				editor.execute( new SetRotationCommand( editor, object, newRotation ) );
			}

			const newScale = new THREE.Vector3( objectScaleX.getValue(), objectScaleY.getValue(), objectScaleZ.getValue() );
			if ( object.scale.distanceTo( newScale ) >= 0.01 ) {
				editor.execute( new SetScaleCommand( editor, object, newScale ) );
			}

			if ( object.fov !== undefined && Math.abs( object.fov - objectFov.getValue() ) >= 0.01 ) {
				editor.execute( new SetValueCommand( editor, object, 'fov', objectFov.getValue() ) );
				object.updateProjectionMatrix();
			}

			if ( object.left !== undefined && Math.abs( object.left - objectLeft.getValue() ) >= 0.01 ) {
				editor.execute( new SetValueCommand( editor, object, 'left', objectLeft.getValue() ) );
				object.updateProjectionMatrix();
			}

			if ( object.right !== undefined && Math.abs( object.right - objectRight.getValue() ) >= 0.01 ) {
				editor.execute( new SetValueCommand( editor, object, 'right', objectRight.getValue() ) );
				object.updateProjectionMatrix();
			}

			if ( object.top !== undefined && Math.abs( object.top - objectTop.getValue() ) >= 0.01 ) {
				editor.execute( new SetValueCommand( editor, object, 'top', objectTop.getValue() ) );
				object.updateProjectionMatrix();
			}

			if ( object.bottom !== undefined && Math.abs( object.bottom - objectBottom.getValue() ) >= 0.01 ) {
				editor.execute( new SetValueCommand( editor, object, 'bottom', objectBottom.getValue() ) );
				object.updateProjectionMatrix();
			}

			if ( object.near !== undefined && Math.abs( object.near - objectNear.getValue() ) >= 0.01 ) {
				editor.execute( new SetValueCommand( editor, object, 'near', objectNear.getValue() ) );
				if ( object.isOrthographicCamera ) {
					object.updateProjectionMatrix();
				}
			}

			if ( object.far !== undefined && Math.abs( object.far - objectFar.getValue() ) >= 0.01 ) {
				editor.execute( new SetValueCommand( editor, object, 'far', objectFar.getValue() ) );
				if ( object.isOrthographicCamera ) {
					object.updateProjectionMatrix();
				}
			}

			if ( object.intensity !== undefined && Math.abs( object.intensity - objectIntensity.getValue() ) >= 0.01 ) {
				editor.execute( new SetValueCommand( editor, object, 'intensity', objectIntensity.getValue() ) );
			}

			if ( object.color !== undefined && object.color.getHex() !== objectColor.getHexValue() ) {
				editor.execute( new SetColorCommand( editor, object, 'color', objectColor.getHexValue() ) );
			}

			if ( object.groundColor !== undefined && object.groundColor.getHex() !== objectGroundColor.getHexValue() ) {
				editor.execute( new SetColorCommand( editor, object, 'groundColor', objectGroundColor.getHexValue() ) );
			}

			if ( object.distance !== undefined && Math.abs( object.distance - objectDistance.getValue() ) >= 0.01 ) {
				editor.execute( new SetValueCommand( editor, object, 'distance', objectDistance.getValue() ) );
			}

			if ( object.angle !== undefined && Math.abs( object.angle - objectAngle.getValue() ) >= 0.01 ) {
				editor.execute( new SetValueCommand( editor, object, 'angle', objectAngle.getValue() ) );
			}

			if ( object.penumbra !== undefined && Math.abs( object.penumbra - objectPenumbra.getValue() ) >= 0.01 ) {
				editor.execute( new SetValueCommand( editor, object, 'penumbra', objectPenumbra.getValue() ) );
			}

			if ( object.decay !== undefined && Math.abs( object.decay - objectDecay.getValue() ) >= 0.01 ) {
				editor.execute( new SetValueCommand( editor, object, 'decay', objectDecay.getValue() ) );
			}

			if ( object.visible !== objectVisible.getValue() ) {
				editor.execute( new SetValueCommand( editor, object, 'visible', objectVisible.getValue() ) );
			}

			if ( object.frustumCulled !== objectFrustumCulled.getValue() ) {
				editor.execute( new SetValueCommand( editor, object, 'frustumCulled', objectFrustumCulled.getValue() ) );
			}

			if ( object.renderOrder !== objectRenderOrder.getValue() ) {
				editor.execute( new SetValueCommand( editor, object, 'renderOrder', objectRenderOrder.getValue() ) );
			}

			if ( object.castShadow !== undefined && object.castShadow !== objectCastShadow.getValue() ) {
				editor.execute( new SetValueCommand( editor, object, 'castShadow', objectCastShadow.getValue() ) );
			}

			if ( object.receiveShadow !== objectReceiveShadow.getValue() ) {
				if ( object.material !== undefined ) object.material.needsUpdate = true;
				editor.execute( new SetValueCommand( editor, object, 'receiveShadow', objectReceiveShadow.getValue() ) );
			}

			if ( object.shadow !== undefined ) {
				if ( object.shadow.intensity !== objectShadowIntensity.getValue() ) {
					editor.execute( new SetShadowValueCommand( editor, object, 'intensity', objectShadowIntensity.getValue() ) );
				}

				if ( object.shadow.bias !== objectShadowBias.getValue() ) {
					editor.execute( new SetShadowValueCommand( editor, object, 'bias', objectShadowBias.getValue() ) );
				}

				if ( object.shadow.normalBias !== objectShadowNormalBias.getValue() ) {
					editor.execute( new SetShadowValueCommand( editor, object, 'normalBias', objectShadowNormalBias.getValue() ) );
				}

				if ( object.shadow.radius !== objectShadowRadius.getValue() ) {
					editor.execute( new SetShadowValueCommand( editor, object, 'radius', objectShadowRadius.getValue() ) );
				}
			}

			try {
				const userData = JSON.parse( objectUserData.getValue() );
				if ( JSON.stringify( object.userData ) != JSON.stringify( userData ) ) {
					editor.execute( new SetValueCommand( editor, object, 'userData', userData ) );
				}
			} catch ( exception ) {
				console.warn( exception );
			}
		}
	}

	function updateRows( object ) {
		const properties = {
			'fov': objectFovRow,
			'left': objectLeftRow,
			'right': objectRightRow,
			'top': objectTopRow,
			'bottom': objectBottomRow,
			'near': objectNearRow,
			'far': objectFarRow,
			'intensity': objectIntensityRow,
			'color': objectColorRow,
			'groundColor': objectGroundColorRow,
			'distance': objectDistanceRow,
			'angle': objectAngleRow,
			'penumbra': objectPenumbraRow,
			'decay': objectDecayRow,
			'castShadow': objectShadowRow,
			'receiveShadow': objectReceiveShadow,
			'shadow': [ objectShadowIntensityRow, objectShadowBiasRow, objectShadowNormalBiasRow, objectShadowRadiusRow ]
		};

		for ( const property in properties ) {
			const uiElement = properties[ property ];

			if ( Array.isArray( uiElement ) === true ) {
				for ( let i = 0; i < uiElement.length; i ++ ) {
					uiElement[ i ].setDisplay( object[ property ] !== undefined ? '' : 'none' );
				}
			} else {
				uiElement.setDisplay( object[ property ] !== undefined ? '' : 'none' );
			}
		}

		//

		if ( object.isLight ) {
			objectReceiveShadow.setDisplay( 'none' );
		}

		if ( object.isAmbientLight || object.isHemisphereLight ) {
			objectShadowRow.setDisplay( 'none' );
		}

	}

	function updateTransformRows( object ) {
		if ( object.isLight ) {
			objectRotationRow.setDisplay( 'none' );
			objectScaleRow.setDisplay( 'none' );
		} else {
			objectRotationRow.setDisplay( '' );
			objectScaleRow.setDisplay( '' );
		}
	}

	// events

	signals.objectSelected.add( function ( object ) {
		if ( object !== null ) {
			container.setDisplay( 'block' );

			updateRows( object );
			updateUI( object );
		} else {
			container.setDisplay( 'none' );
		}
	} );

	signals.objectChanged.add( function ( object ) {
		if ( object !== editor.selected ) return;

		updateUI( object );
	} );

	signals.refreshSidebarObject3D.add( function ( object ) {
		if ( object !== editor.selected ) return;

		updateUI( object );
	});

	function updateUI( object ) {
		objectType.setValue( object.type );

		objectUUID.setValue( object.uuid );
		objectName.setValue( object.name );

		objectPositionX.setValue( object.position.x );
		objectPositionY.setValue( object.position.y );
		objectPositionZ.setValue( object.position.z );

		objectRotationX.setValue( object.rotation.x * THREE.MathUtils.RAD2DEG );
		objectRotationY.setValue( object.rotation.y * THREE.MathUtils.RAD2DEG );
		objectRotationZ.setValue( object.rotation.z * THREE.MathUtils.RAD2DEG );

		objectScaleX.setValue( object.scale.x );
		objectScaleY.setValue( object.scale.y );
		objectScaleZ.setValue( object.scale.z );

		if ( object.fov !== undefined ) {
			objectFov.setValue( object.fov );
		}

		if ( object.left !== undefined ) {
			objectLeft.setValue( object.left );
		}

		if ( object.right !== undefined ) {
			objectRight.setValue( object.right );
		}

		if ( object.top !== undefined ) {
			objectTop.setValue( object.top );
		}

		if ( object.bottom !== undefined ) {
			objectBottom.setValue( object.bottom );
		}

		if ( object.near !== undefined ) {
			objectNear.setValue( object.near );
		}

		if ( object.far !== undefined ) {
			objectFar.setValue( object.far );
		}

		if ( object.intensity !== undefined ) {
			objectIntensity.setValue( object.intensity );
		}

		if ( object.color !== undefined ) {
			objectColor.setHexValue( object.color.getHexString() );
		}

		if ( object.groundColor !== undefined ) {
			objectGroundColor.setHexValue( object.groundColor.getHexString() );
		}

		if ( object.distance !== undefined ) {
			objectDistance.setValue( object.distance );
		}

		if ( object.angle !== undefined ) {
			objectAngle.setValue( object.angle );
		}

		if ( object.penumbra !== undefined ) {
			objectPenumbra.setValue( object.penumbra );
		}

		if ( object.decay !== undefined ) {
			objectDecay.setValue( object.decay );
		}

		if ( object.castShadow !== undefined ) {
			objectCastShadow.setValue( object.castShadow );
		}

		if ( object.receiveShadow !== undefined ) {
			objectReceiveShadow.setValue( object.receiveShadow );
		}

		if ( object.shadow !== undefined ) {
			objectShadowIntensity.setValue( object.shadow.intensity );
			objectShadowBias.setValue( object.shadow.bias );
			objectShadowNormalBias.setValue( object.shadow.normalBias );
			objectShadowRadius.setValue( object.shadow.radius );
		}

		objectVisible.setValue( object.visible );
		objectFrustumCulled.setValue( object.frustumCulled );
		objectRenderOrder.setValue( object.renderOrder );

		try {
			objectUserData.setValue( JSON.stringify( object.userData, null, '  ' ) );
		} catch ( error ) {
			console.log( error );
		}

		objectUserData.setBorderColor( 'transparent' );
		objectUserData.setBackgroundColor( '' );

		updateTransformRows( object );
	}

	return container;
}

export { SidebarObject };
