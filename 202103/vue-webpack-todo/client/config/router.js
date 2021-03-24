import Router from 'vue-router'

import routes from './routes'

export default ()=> {
  return new Router({
    routes,
    mode: 'history', // 不采用hash模式
    // base: '/base/' // 跳转基路径，路由前会加上这个名字
    linkActiveClass: 'active-link', // 指定router-link的样式
    linkExactActiveClass: 'exact-active-link',
    scrollBehavior (to, from, savedPosition) { // 跳转的时候保存滚动位置
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0}
      }
    },
    fallback: true, // 在不支持的时候,就用hash模式
    // parseQuery (query) {

    // },
    // stringifyQuery(object) {

    // }
  })
}
