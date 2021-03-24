import Vue from 'vue'
const app = new Vue({
  // el: '#root',
  // template: '<div>{{text}}</div>',
  data(){
    return {
      text: 0
    }
  },
  beforeCreate() {
    console.log(this.$el, 'beforeCreate'); // this.$el是undefined
  },
  created() {
    console.log(this.$el, 'created'); // this.$el是undefined
  },
  beforeMount() {
    console.log(this.$el, 'beforeMount'); // <div id="root"></div>
  },
  mounted() {
    console.log(this, 'mounted'); // <div>0</div> 服务端不会触发beforeMount和monted
  },
  beforeUpdate() {
    console.log(this, 'beforeUpdate');
  },
  updated() {
    console.log(this, 'updated');
  },
  activated() { // 组件章节讲解
    console.log(this, 'activated');
  },
  deactivated() {
    console.log(this, 'deactivated');
  },
  beforeDestroy() {
    console.log(this, 'beforeDestroy');
  },
  destroyed() {
    console.log(this, 'destroyed')
  },
  render(h) {
    // throw new TypeError('render error')
    console.log('render') // 是在beforemount之后，mounted之前
    return h('div', {}, this.text)
  },
  renderError(h, error){
    return h('div', {}, error.stack) // 测试环境下渲染错误时触发
  },
  errorCaptured() { // 监测线上的东西
    // 会向上冒泡,并且正式环境可使用
  }
}).$mount('#root')

setInterval(()=> {
  app.text += 1
}, 1000);

setTimeout(() => {
  app.$destroy() // 销毁监听
}, 1000);
