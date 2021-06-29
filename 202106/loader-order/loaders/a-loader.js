const loaderUtils = require('loader-utils')

module.exports = function(source) {
    console.log('a-loader.js')
    const url = loaderUtils.interpolateName(this, '[name].[ext]', source)
    console.log('url',url)
    this.emitFile(url, source)
    return source
}