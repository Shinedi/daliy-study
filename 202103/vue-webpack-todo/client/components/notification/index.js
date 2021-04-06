import Notification from './notification.vue'
import notify from './function'

export default (Vue)=> {
  Vue.component(Notification.name, Notification) // 全局注册
  Vue.prototype.$notify = notify // 可以扩展vue的内置的方法
}
