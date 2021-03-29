const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  // 给headers里面的contentType是「text/html」
  ctx.headers['ContentType'] = 'text/html';

  const context = {url: ctx.path} // 服务端渲染时，传入vue-server-render中,渲染完成后，会添加许多东西，让我们渲染html
  try {
    const appString = await renderer.renderToString(context) // 返回一个promise

    const {title} = context.meta.inject()

    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(), // 拿到带有style标签的整个字符串,扔到html里面去
      scripts: context.renderScripts(),
      title: title.text()

    }) // 把html渲染出来
    ctx.body = html
  } catch(e) {
    console.log('render error')
    throw(e)
  }
}
