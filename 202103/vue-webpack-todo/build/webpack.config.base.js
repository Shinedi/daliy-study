const path = require('path')                            //path是Nodejs中的基本包,用来处理路径
const createVueLoaderOptions = require('./vue-loader.config')

const isDev = process.env.NODE_ENV === "development"

const config = {
    target: "web",                                      //设置webpack的编译目标是web平台
    entry: path.join(__dirname,'../client/index.js'),         //声明js文件入口,__dirname就是我们文件的根目录,用join拼接
    output:{                                            //声明出口文件
        filename: 'bundle.js',                          //将挂载的App全部打包成一个bundle.js,在浏览器中可以直接运行的代码
        path: path.join(__dirname,'../dist'),           //bundle.js保存的位置
        publicPath: '/public/'
    },
    module:{                                            //因为webpack只能处理js文件,且只识别ES5的语法
        rules:[
            // {
            //     test: /\.(vue|jsx|js)$/,
            //     loader: 'eslint-loader',
            //     exclude: /node_modules/,
            //     enforce: 'pre'
            // },                                     //所以针对不同类型的文件,我们定义不同的识别规则,最终目的都是打包成js文件
            {
                test: /\.vue$/,
                loader: 'vue-loader',                    //处理.vue文件
                options: createVueLoaderOptions(isDev)
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'                  //处理jsx文件
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',                  //处理js文件
                exclude: /node_modules/                  //忽略node_modules中的js文件
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,      //处理图片
                use: [
                    {                                   //loader是可以配置选项的,如下options
                        loader: 'url-loader',           //url-loader实际上依赖于file-loader,file-loader处理完文件可以保存为一个文件供处理
                        options: {
                            limit: 1024,                //url-loader的好处是可以加一个限制的大小,对于小图片,在范围内可直接将图片转换成base64码直接存放在js中,以减少http请求.
                            name: 'resources/[path][name].[hash:8].[ext]'        //输出文件的名字,[name] 文件原名,[ext]文件扩展名,可以将输出的资源放在统一的目录下
                        }
                    }
                ]
            }
        ]
    }

}

module.exports = config                                 //声明一个config的配置,用于对外暴露
