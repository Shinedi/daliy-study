
const docsLoader = require.resolve('./doc-loader')
module.exports = (isDev) => {
    return {
        preserveWhitepace: true, // 避免不小心在模板中的字符的后面加上空格
        extractCss: !isDev, // 不加这个属性，.vue文件的style样式就不会打包到webpack中设置的css文件中,原因：vue认为如果使用异步加载，没必要把所有css样式加载到整个dom中，等到组件需要加载的时候再加上(试了下，好像没什么卵用)
        cssModules: {
            localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',  // 把vue中css的classname生成这样独一无二的名字
            camelCase: true, // 变成驼峰式
        },
        // hotReload: false, // 关闭热重载，内容改变，页面会刷新,一般不需要我们手动设置，它会根据环境变量自己生成
        // postcss 给样式加前缀
        loaders: { // 可以给vue-loader自定义一些模块，给这些模块指定loader 不常用
            'docs': docsLoader
        },
        preLoader: { // 假如是js文件，可以先用指定的loader解析之后，再用babel-loader再解析,这种情况例如是在使用ts时 不常用

        },
        // postLoader 在vue指定的loader解析之后,再用指定的Loader进行解析 不常用
    }
}