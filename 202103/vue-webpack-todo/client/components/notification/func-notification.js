import Notification from './notification.vue'

export default {
  extends: Notification,
  computed: {
    style () {  // 继承可以覆盖组件中的style
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  mounted() {
    this.createTimer()
  },
  methods: {
    createTimer () {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.autoClose)
      }
    },
    clearTimer () {
      if(this.timer) {
        clearTimeout(this.timer)
      }
    },
    afterEnter () {
      // debugger
      this.height = this.$el.offsetHeight
    }
  },
  beforeDestroy() {
    this.clearTimer()
  },
  data () {
    return {
      verticalOffset: 0,
      autoClose: 3000,
      height: 0,
      visible: false
    }
  }
}
