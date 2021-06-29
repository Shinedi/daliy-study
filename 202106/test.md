2021.06.16
---
> webpack打包原理
---
* 开始：从webpack命令行说起
    - 通过npm scripts运行webpack
        - 开发环境： npm run dev
        - 生产环境： npm run build
    - 通过webpack直接运行
        - webpack entry.js bundle.js
    - 查找 webpack 入口文件:在命令行运行以上命令后，npm会让命令行工具进入`node_modules\.bin`目录 查找是否存在 `webpack.sh`或者`webpack.cmd`文件，如果存在，就执行，不存在，就抛出错误。
    - 实际入口： node_modules\webpack\bin\webpack.js
* 分析webpack.js
    ```
        process.exitCode = 0; //1. 正常执行返回
        const runCommand = (command, args) =>{...}; const isInstalled = packageName =>{...}; //2. 运行某个命令
        const isInstalled = packageName =>{...}; //3. 判断某个包是否安装 
        const CLIs =[...]; //4. webpack 可用的 CLI: webpack-cli 和webpacl-command
        const installedClis = CLIs.filter(cli => cli.installed);  //5. 判断是否两个 ClI 是否安装了
        if (installedClis.length === 0){...} else if //6. 根据安装数量进行处理
        (installedClis.length === 1){...}else{...}.
    ```
* 启动后的结果:`webpack`最终找到`webpack-cli`(webpack-command) 这个 npm 包，并且执行 CLI
* webpack-cli 执行的结果:webpack-cli对配置文件和命令行参数进行转换最终生成配置选项参数 options,最终会根据配置参数实例化 webpack 对象，然后执行构建流程
* plugin实现要素
    - 有apply方法apply(compiler)
    - 触发hooks
* webpack流程篇：准备阶段
    - 将内部插件挂载到compiler实例上
    - 做entryPlugin的初始化
* webpack流程篇：模块构建和chunk生成阶段
