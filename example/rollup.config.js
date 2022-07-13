import eta from '../dist/index'
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'app/index.js',
    output: [{
        dir: 'dist',
        format: 'es'
    }],
    plugins: [
        resolve(),
        eta({
            data: {
                age: 42
            }
        })
    ]
};
