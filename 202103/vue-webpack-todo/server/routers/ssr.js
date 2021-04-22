const Router = require('koa-router')
const path = require('path')
const VueServerRender = require('vue-server-renderer')
const fs = require('fs')

const serverRender = require('./server-render')

const clientManifest = require('../../public/vue-ssr-client-manifest.json')

const renderer = VueServerRender.createBundleRenderer( // renderer可复用
  path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json'), {
    inject: false,
    clientManifest
  }
)

const template = fs.readFileSync(
  path.join(__dirname, '../server.template.ejs'),
  'utf-8'
)

const pageRouter = new Router()
pageRouter.get('*', async ctx => {
  await serverRender(ctx, renderer, template)
})

module.exports = pageRouter