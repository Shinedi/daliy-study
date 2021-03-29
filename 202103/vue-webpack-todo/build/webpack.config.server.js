const path = require('path')                            //path是Nodejs中的基本包,用来处理路径
const webpack = require("webpack")                      //引入webpack
const webpackMerge = require("webpack-merge")
const ExtractPlugin = require("extract-text-webpack-plugin")
const baseConfig = require("./webpack.config.base")
const VueServerPlugin = require("vue-server-renderer/server-plugin")


const isDev = process.env.NODE_ENV === "development"    //判断是否为测试环境,在启动脚本时设置的环境变量都是存在于process.env这个对象里面的



let config

config = webpackMerge.merge(baseConfig, {
  target: 'node',  // 打包出来的文件是在node端运行
  entry: path.join(__dirname, '../client/server-entry.js'),
  output: {
    libraryTarget: 'commonjs2',   // 表示export出去的方式：module.exports,引用require ,打包出一个json文件
    filename: 'server-entry.js', // 文件名称
    path: path.join(__dirname, '../server-build') // 输出目录
  },
  externals: Object.keys(require('../package.json').dependencies),  // 除了这几个文件其他的都要打包。直接在打包出来的js引用要依赖的东西，不用像前端渲染时把依赖的一些包也打包进同一个js中
  devtool: 'source-map', // 官方推荐使用这个配置,作用是在浏览器中调试时,显示的代码和我们的项目中的代码会基本相似,而不会显示编译后的代码,以致于我们调试连自己都看不懂
  module: {
      rules: [
        {
          test: /\.styl/,
          use: ExtractPlugin.extract({
              fallback: 'style-loader',
              use: [
                  'css-loader',                       //css-loader处理css
                  {
                      loader: 'postcss-loader',
                      options: {
                          sourceMap: true,            //stylus-loader和postcss-loader自己都会生成sourceMap,如果前面stylus-loader已生成了sourceMap
                      }                               //那么postcss-loader可以直接引用前面的sourceMap
                  },
                  'stylus-loader'                     //处理stylus的css预处理器的问题件,转换成css后,抛给上一层的css-loader
              ]
          })
      }
    ]
  },
  plugins: [ //添加两个插件用于hot:true的配置
    new ExtractPlugin('styles.[contentHash:8].css'),   //定义打包分离出的css文件名
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueServerPlugin() // 对打包出的json文件做很多服务端渲染相关的内容
  ]
})

module.exports = config                                 //声明一个config的配置,用于对外暴露
