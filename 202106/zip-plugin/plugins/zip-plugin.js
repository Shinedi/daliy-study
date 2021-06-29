const JSZip = require('jszip')
const zip = new JSZip()
const RawSource = require('webpacl-sources').RawSource

module.exports = class ZipPlugin {
    constructor(options) {
        this.options = options
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
            const folder = zip.folder(this.options.filename)

            for (let filename in compilation.assets) {
                const source = compilation.assets[filename].source()
                folder.file(filename, source)
            }
            zip.generateAsync({
                type: 'nodebuffer'
            }).then((content) => {
                const outputpath = path.join(compilation.options.output.path, this.options.filename + '.zip')
                compilation.assets[outputpath] = new RawSource(content)
                callback()
            })
        })

        // console.log('My plugin is executed')
        // console.log('My plugin options', this.options)
    }
}