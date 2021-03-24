import Vue from 'vue'

const app = new Vue({
  // el: '#root', // 要挂载的节点名，挂载的时候会把这个节点替换掉
  template: '<div ref="div">{{text}} this is content{{obj.c}}</div>',
  data(){
    return {
      text: 1,
      obj: {
      }
    }
  }
  // watch: {
  //   text(newVal, oldVal) {
  //     console.log(`${newVal}: ${oldVal}`)
  //   }
  // }
})

app.$mount('#root')  // 这样也可以挂载在root这个节点上
// app.text = 'text1'
let i = 0
setInterval(()=> {
  i++
  // app.obj.c = i
  app.$set(app.obj, 'c', i)
  // app.$forceUpdate()
  // app.$options.data +=1; // 页面上text值不会变，data其实是个函数
  // app.$data.text+=1 // 页面上text值会递增,这里的text和this.text一样
}, 1000)
console.log('this', this)
console.log('app.$data', app.$data)  // 输出text的值
// console.log(app.$props) // undefined(因为没定义)
// console.log(app.$el) // <div>19 this is content</div>(输出html节点)
// console.log(app.$options) // 输出new Vue实例的时候传入的对象（这个对象也包含了vue默认的配置项）
/* app.$options.render = (h) => { // 等到页面重新渲染的时候才会触发这个render函数（例如text值不变化，那么页面就不会重新渲染，那么就不会触发这个render函数）
  return  h('div', {}, 'new render function')
}
 */
// console.log(app.$root === app) // 输出 true app.$root其实是和app一样是vue实例
// console.log(app.$children)
// console.log(app.$slots)
// console.log(app.$scopedSlots)
// console.log(app.$refs) // 如果是vue组件，则返回这个组件的vue实例，如果是html的话返回html节点
// console.log(app.$isServer) // 服务端渲染

// const unWatch = app.$watch('text', (newVal, val) => { // 调用app.$watch方法进行监听，不再监听的时候需要销毁掉(不然会造成内存溢出)，app.$watch会返回一个注销函数
//   console.log(`${newVal}: ${val}`)
// })

// setTimeout(()=> {
//   unWatch()
// }, 2000)

// app.$on('test', (a, b)=>{
//   console.log(`test emited ${a}-${b}`)
// })

app.$once('test', (a, b)=> { // 只能触发一次
  console.log(`test once ${a}-${b}`)
})

setInterval(() => {
  app.$emit('test', 1,2)
}, 1000);

// app.$forceUpdate() // 强制渲染
