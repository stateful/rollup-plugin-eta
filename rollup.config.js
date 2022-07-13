import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const extensions = ['.js', '.ts'];

export default {
    input: 'src/index.ts',
    output: [{
        dir: 'dist',
        format: 'es'
    }],
    plugins: [
        resolve({ extensions }),
        typescript({
            tsconfig: './tsconfig.json',
            outDir: 'dist',
            declarationDir: './dist',
        })
    ],
    external: ['eta']
};
