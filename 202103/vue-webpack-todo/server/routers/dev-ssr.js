const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const MemoryFs = require('memory-fs')
const webpack = require('webpack')
const fs = require('fs') // 读取模板
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')


const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFs() // 读写内存中的文件，比读取磁盘文件更快
serverCompiler.outputFileSystem = mfs // 指定输出路径在mfs

let bundle // 记录webpack打包生成的新的文件
serverCompiler.watch({}, (err, stats) => { // 在文件有变化的时候，在服务端重新打包
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json' // vue-server-render生成的文件名，body中的部分
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated')
})
const handleSSR = async ctx => {
  console.log("bundle", bundle)
  if (!bundle) {
    ctx.body = `你等一会 `
    return
  }

  const clientManifestResp = await axios.get( // 获取浏览器端webpack中打包好的json
    'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json' // vue-ssr-client-manifest.json是这个插件VueClientPlugin生成的文件名
  )
  console.log('_____',clientManifestResp.data)
  const clientManifest = clientManifestResp.data

  const template = fs.readFileSync( // 读取模板
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false, // 指定一个template，这个tamplate按照官方提供的模板来指定，限制比较大
    clientManifest
  })

  await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router
