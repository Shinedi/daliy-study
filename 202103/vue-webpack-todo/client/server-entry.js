import createApp from './create-app'


export default context => {
  return new Promise((resolve, reject) => {
    console.log('server-entry')
    const {app, router, store} = createApp()

    router.push(context.url) // server渲染执行完成会调用这里，这时候访问的js路径还是webpack-dev-server生成的，服务端渲染找不到，就会报错或者图片不显示，
    // 可以修改webpack.config.base.js中的output.publicPath
    router.onReady(()=> {
      const matchedComponents = router.getMatchedComponents() // 服务端渲染时才会用到
      if (!matchedComponents.length) {
        return reject(new Error('no components matched'))
      }
      Promise.all(matchedComponents.map(component => {
        if (component.asyncData) {
          component.asyncData({
            route: router.currentRoute,
            store
          })
        }
      })).then(data => {
        console.log('data',data)
      })
      context.meta = app.$meta()
      resolve(app)
    }) // 服务端渲染时才会用到.在一条路由记录被推进去之后，所有的异步操作做完之后，才会调用这个回调
  })
}
