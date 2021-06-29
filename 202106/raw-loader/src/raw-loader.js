const loaderUtils = require('loader-utils')
const fs = require('fs')
const path = require('path')

module.exports = function(source) {
    const {name} = loaderUtils.getOptions(this)
    this.cacheable(false)
    const callback = this.async()
    const json = JSON.stringify(source)
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029');
    fs.readFile(path.join(__dirname, './async.txt'), 'utf-8', (err, data)=> {
        if (err) {
            callback(err, '')
        }
        callback(null, data)
    })
    // throw new Error('ERROR')
    // this.callback(new Error(), json)
    // return `export default ${json}`
}