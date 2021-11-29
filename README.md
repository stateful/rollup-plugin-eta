rollup-plugin-eta [![Test Changes](https://github.com/stateful/rollup-plugin-eta/actions/workflows/test.yaml/badge.svg)](https://github.com/stateful/rollup-plugin-eta/actions/workflows/test.yaml)
=================

[Rollup.js](https://rollupjs.org/guide/en/) template loader plugin for [η (Eta)](https://eta.js.org/). Supports loading of any files with proper Eta content.

## Installation

Using NPM:

```sh
npm install eta rollup-plugin-eta --save-dev
```

or Yarn:

```sh
yarn add --dev eta rollup-plugin-eta
```

## Usage

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:

```js
// rollup.config.js
import eta from 'rollup-plugin-eta';

rollup({
    entry: 'main.js',
    output: [
        {
            dir: 'dist',
            format: 'esm'
        },
    ],
    plugins: [
        eta({
            include: ['**/*.eta', '**/*.html'], // optional, '**/*.eta' by default
            exclude: ['**/index.html'], // optional, undefined by default
            data: {
                name: 'John Doe'
            }, // optional, default template data
            etaConfig: {
                tags: ['<%', '%>']
            } // optional, eta configuration
        }),
    ],
});
```

In your app you can then import your template and render its content, e.g.:

```javascript
// main.js
import tpl from './tpl.eta';
console.log(tpl({ age: 42 }));
```

If your template file (`tpl.eta`) looks as follows:

```html
<p>Hello 👋 , my name is <%= it.name %> and I am <%= it.age %> year old ✨</p>
```

Then, your compiled file would return:

```sh
$ node ./dist/main.js
<p>Hello 👋 , my name is John Doe and I am 42 year old ✨</p>
```

## Options

The following options are unique to `rollup-plugin-eta`:

### `include`

Type: `String` | `Array[...String]`<br>
Default: `['**/*.eta']`

A [minimatch pattern](https://github.com/isaacs/minimatch), or array of patterns, which specifies the files in the build the plugin should operate on. By default all `**/*.eta` files are targeted.

### `exclude`

Type: `String` | `Array[...String]`<br>
Default: `[]`

A [minimatch pattern](https://github.com/isaacs/minimatch), or array of patterns, which specifies the files in the build the plugin should _ignore_. By default no files are ignored.

### `data`

Type: `Object`<br>
Default: `null`

A default set of data inputs for the template.

### `etaConfig`

Type: `Object`<br>
Default: `null`

The default Eta configuration object (`Eta.config`).

## Contribute

You have an idea on how to improve the package, please send us a pull request! Have a look into our [contributing guidelines](CONTRIBUTING.md).

## Getting Help

Running into issues or are you missing a specific usecase? Feel free to [file an issue](https://github.com/stateful/rollup-plugin-eta/issues/new).

---

<p align="center"><small>Copyright 2021 © <a href="http://stateful.com/">Stateful</a> – Apache 2.0 License</small></p>
