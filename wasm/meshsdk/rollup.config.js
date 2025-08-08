import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
    // Node build
    {
        input: 'src/index.ts',
        output: {
            file: 'lib/node/index.js',
            format: 'esm',
        },
        external: [],
        plugins: [
            nodeResolve(),
            commonjs(),
            typescript({ 
                tsconfig: './tsconfig.rollup.json', 
                outDir: 'lib/node',
                declarationDir: 'lib/node', 
            }),
        ],
    },

    // Web build
    {
        input: 'src/index.ts',
        output: {
            file: 'lib/web/index.js',
            format: 'esm',
        },
        plugins: [
            nodeResolve({ browser: true }),
            commonjs(),
            typescript({ 
                tsconfig: './tsconfig.rollup.json', 
                outDir: 'lib/web', 
                declarationDir: 'lib/web', 
            }),
        ],
    },
];
