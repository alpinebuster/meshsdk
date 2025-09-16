import * as THREE from 'three';

import { AddObjectCommand } from './commands/AddObjectCommand.js';


const dispose = (vPtr, iPtr) => {
	editor.MeshSDK.freeVerticesRaw(vPtr);
	editor.MeshSDK.freeIndicesRaw(iPtr);
}
const logSample = (vertexCount, vertices, indexCount, indices, n = 10) => {
	console.log('Vertices:');
	for (let i = 0; i < Math.min(n, vertexCount); i++) {
		console.log(
			`vertex ${i}: x=${vertices[i * 3]}, y=${vertices[i * 3 + 1]}, z=${vertices[i * 3 + 2]}`
		);
	}

	console.log('Indices:');
	for (let i = 0; i < Math.min(n, indexCount); i++) {
		console.log(`index ${i}: ${indices[i]}`);
	}
}

const createMemoryViewFromGeometry = ( editor, geometry ) => {
	const vertices = geometry.getAttribute('position').array; // `Float32Array`
	const indices = geometry.getIndex().array; // `Uint32Array`

	/// Vertices
	// 1) allocate `nVerts*3` floats in WASM
	const verticesCount = vertices.length; 
	// NOTE: 
	//
	// In`_malloc`, the specified value is in bytes, not in the number of elements
	// 
	// Each element in `Float32Array` occupies **4 bytes** (32 bits = 4 bytes)
	// const verticesPtr = editor.MeshSDK._malloc(verticesCount * 4);
	//
	const bytes = verticesCount * Float32Array.BYTES_PER_ELEMENT; // BYTES_PER_ELEMENT === 4
	const verticesPtr = editor.MeshSDK._malloc( bytes );
	// 2) construct a JS Float32Array that _views_ the WASM heap:
	const verticesArray = new Float32Array( editor.MeshSDK.HEAPF32.buffer, verticesPtr, verticesCount );
	// 3) copy into it (once), or let your own code fill it:
	verticesArray.set( vertices );
	///

	/// Indices
	const indicesCount = indices.length;
	const indicesPtr = editor.MeshSDK._malloc( indicesCount * 4 );
	const indicesArray = new Uint32Array( editor.MeshSDK.HEAPU32.buffer, indicesPtr, indicesCount );
	indicesArray.set( indices );
	///

	return { verticesPtr, verticesArray, verticesCount, indicesPtr, indicesArray, indicesCount };
} 

function showMesh( wasmMesh, newVertices, newIndices ) {
	const newGeometry = new THREE.BufferGeometry();
	newGeometry.setAttribute( 'position', new THREE.BufferAttribute( newVertices, 3 ) );
	newGeometry.computeVertexNormals();
	newGeometry.setIndex( new THREE.BufferAttribute( newIndices, 1 ) );

	const newMaterial = new THREE.MeshNormalMaterial( { wireframe: false } );
	const newMesh = new THREE.Mesh( newGeometry, newMaterial );
	newMesh.name = `wasm-${editor.selected.name}-${editor.selected.uuid.substring(0, 3)}`;
	newMesh.castShadow = true;
	newMesh.receiveShadow = true;


	///
	// const pointMaterial = new THREE.PointsMaterial({
	// 	color: 0xff0000,
	// 	size: 0.5,
	// 	sizeAttenuation: true
	// });
	// const points = new THREE.Points( newGeometry, pointMaterial );
	// editor.execute( new AddObjectCommand( editor, points ) );
	///

	
	editor.execute( new AddObjectCommand( editor, newMesh, null, null, wasmMesh ) );
	editor.signals.geometryChanged.dispatch( newMesh );
	editor.select( newMesh );
}

export default createMemoryViewFromGeometry;
export { showMesh, dispose, logSample };
