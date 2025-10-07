#!/usr/bin/env node

import { fileURLToPath } from 'url';
import path, { dirname, join, normalize } from 'path';
import {
	existsSync, rmSync, mkdirSync, copyFileSync,
	readdirSync, readFileSync, writeFileSync, unlinkSync, 
	symlinkSync
} from 'fs';

// Get current directory (equivalent to cd "$(dirname "$0")")
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
process.chdir(__dirname);

const OUT_DIRECTORY = 'lib';

// Main build function
async function build(): Promise<void> {
	try {
		// Find WASM bin directory
		const debugBin = join(__dirname, '../../build/Debug/bin');
		const releaseBin = join(__dirname, '../../build/Release/bin');
		const binDir = existsSync(releaseBin) ? releaseBin : debugBin;
		console.log(`\n************ Using WASM Bin Directory: ${binDir} ************`);


		// Delete `MRJavaScript.*` files in `src/`
		const srcDir = join(__dirname, 'src');
		const oldWasmFiles = readdirSync(srcDir).filter(f => f.startsWith('MRJavaScript.'));
		if (oldWasmFiles.length > 0) {
			console.log('\n');
			console.log('----------------------------------------------------------------------');
			for (const file of oldWasmFiles) {
				const filePath = join(srcDir, file);
				unlinkSync(filePath);
				console.log(`Deleted old ${file} from \`src/\` directory`);
			}
			console.log('----------------------------------------------------------------------');
		} else {
			console.log(`No old MRJavaScript.* files found in ${srcDir}`);
		}

		// Copy `MRJavaScript.*` files from `binDir` to `src/`
		const binFiles = readdirSync(binDir).filter(f => f.startsWith('MRJavaScript.'));
		if (binFiles.length === 0) {
			console.warn(`No \`MRJavaScript.*\` files found in ${binDir}!`);
		} else {
			console.log('\n');
			for (const file of binFiles) {
				const srcPath = join(binDir, file);
				const destPath = join(__dirname, 'src', file);
				copyFileSync(srcPath, destPath);
				console.log('----------------------------------------------------------------------');
				console.log(`Copied WASM bin ${srcPath} to \`src/\` directory！！！`);
			}
			console.log('----------------------------------------------------------------------');
		}


		/// NOTE: Patching for issue #24579: `https://github.com/emscripten-core/emscripten/issues/24579`
		const wasmDTSPath = join(__dirname, 'src', 'MRJavaScript.d.ts');
		if (existsSync(wasmDTSPath)) {
			let wasmDTSContent = readFileSync(wasmDTSPath, 'utf-8');

			// Only replace if "Arguments" exists AND "IArguments" does NOT exist
			if (/\bArguments\b/.test(wasmDTSContent) && !/\bIArguments\b/.test(wasmDTSContent)) {
				wasmDTSContent = wasmDTSContent.replace(/\bArguments\b/g, 'IArguments');
				writeFileSync(wasmDTSPath, wasmDTSContent);

				console.log('\n');
				console.log('----------------------------------------------------------------------');
				console.log('Replaced type `Arguments` with `IArguments` in `MRJavaScript.d.ts`！！！');
				console.log('----------------------------------------------------------------------\n');
			} else {
				console.log('\nNo replacement needed: Either `Arguments` not found or `IArguments` already present.');
			}
		} else {
			console.warn('\n`MRJavaScript.d.ts` not found, cannot replace type `Arguments`!');
		}
		///


		console.log('\n************ Starting Bundling Process ************');
		// Clean or create lib directory
		if (existsSync(OUT_DIRECTORY)) {
			console.log(`Cleaning existing ${OUT_DIRECTORY} directory...`);
			rmSync(OUT_DIRECTORY, { recursive: true, force: true });
		}
		mkdirSync(OUT_DIRECTORY, { recursive: true });

		// Copy required files to `lib/` directory
		console.log('\n************ Copying Required Files ************');
		const wasmFiles = readdirSync(srcDir).filter(f => f.startsWith('MRJavaScript.'));
		console.log('\n');
		for (const file of wasmFiles) {
			const srcPath = join(srcDir, file);
			if (existsSync(srcPath)) {
				const fileName = file.split('/').pop()!;
				const destPath = join(__dirname, OUT_DIRECTORY, fileName);

				const relativePath = path.relative(path.dirname(destPath), srcPath);
				symlinkSync(relativePath, destPath);

				console.log('----------------------------------------------------------------------');
				console.log(`Copied ${srcPath} to ${OUT_DIRECTORY}/`);
			} else {
				console.log('----------------------------------------------------------------------');
				console.warn(`Warning: ${srcPath} not found, skipping...`);
			}
		}
		console.log('----------------------------------------------------------------------');

		console.log('\n************ Bundle Completed Successfully! ************');
	} catch (error) {
		console.error('Bundle failed:', error);
		process.exit(1);
	}
}

// Run the build if this script is executed directly
if (normalize(import.meta.url) === normalize(`file://${process.argv[1]}`)) {
	build().catch((error) => {
		console.error('Unhandled error:', error);
		process.exit(1);
	});
}

export { build };
