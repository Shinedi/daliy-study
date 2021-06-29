const path = require('path')
const Myplugin = require('./plugins/my-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js'
    },
    mode: 'production',
    plugins: [new Myplugin({
        name: '我的名字'
    })]
}