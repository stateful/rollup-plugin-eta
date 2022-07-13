import { compile, config as etaDefaultConfig } from 'eta';
import { Plugin } from 'rollup';
import { createFilter } from 'rollup-pluginutils';
import type { EtaConfig } from 'eta/dist/types/config';

interface PluginOptions {
    include?: string[]
    exclude?: string[],
    data?: object,
    etaConfig?: EtaConfig
}

const defaultPluginOptions: Required<PluginOptions> = {
    include: ['**/*.eta'],
    exclude: [],
    data: {},
    etaConfig: etaDefaultConfig
}

const ETA_UTILS = `
const escMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
}

function replaceChar(s) {
    return escMap[s]
}

class EtaErr extends Error {}
\n\n`

export default (config: PluginOptions = {}): Plugin => {
    const { include, exclude, data, etaConfig } = Object.assign({}, defaultPluginOptions, config)
    const filter = createFilter(include, exclude);

    return {
        name: 'eta',

        transform: async function transform(code, tplFilePath) {
            if (filter(tplFilePath)) {
                const templateFn = compile(code, etaConfig)
                return {
                    code: `${ETA_UTILS}
                    export default (data) => (${templateFn.toString()})({
                        ...${JSON.stringify(data)},
                        ...data
                    }, {
                        e: ${etaDefaultConfig.e.toString()},
                        include: ${etaDefaultConfig.include?.toString()},
                        includeFile: ${etaDefaultConfig.includeFile?.toString()},
                    })`,
                    map: { mappings: '' },
                };
            }
        },
    };
}
