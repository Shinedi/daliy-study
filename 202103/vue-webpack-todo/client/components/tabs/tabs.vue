<script>
import TabContainer from './tab-container.vue'
export default {
  name: 'Tabs',
  components: {
    TabContainer
  },
  // provide() {
  //   return {
  //     value: this.value // 不是reactive属性
  //   }
  // },
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      panes: []
    }
  },
  render() { //vue处理script内容还是用babel来处理的,babel里面加入了transform-vue-jsx,所以支持写jsx
    // const contents = this.panes.map(pane => pane.active ?  pane.$slots.default : null)
    return (
      <div class="tabs">
        <ul class="tabs-header">
          {this.$slots.default}
        </ul>
        <tab-container panes={this.panes}></tab-container>
      </div>
    )
  },
  methods: {
    onChange(index) {
      this.$emit('change', index)
    }
  },
}
</script>
<style lang="stylus" scoped>
.tabs-header
  display flex
  list-style none
  margin 0
  padding 0
  border-bottom 2px solid #ededed
</style>
