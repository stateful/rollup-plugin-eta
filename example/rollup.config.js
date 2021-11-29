import eta from '../dist/index'
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'app/index.js',
    output: [
        {
            dir: 'dist',
            format: 'esm'
        },
    ],
    plugins: [
        resolve(),
        eta({
            data: {
                age: 42
            }
        })
    ]
};
