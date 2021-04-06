<script>
export default {
  name: 'Tab',
  props: {
    index: {
      required: true,
      type: [Number, String]
    },
    label: {
      type: String,
      default: 'tab'
    }
  },
  // inject: ['value'], // 注入
  computed: {
    active () {
      // return this.value == this.index // 使用注入
      return this.$parent.value == this.index
    }
  },
  mounted() {
    this.$parent.panes.push(this)
  },
  render () {
    const tab = this.$slots.label || <span>{this.label}</span>
    const classNames = {
      tab: true,
      active: this.active
    }
    return (
      <li class={classNames} on-click={this.handleCilck}>
        {tab}
      </li>
    )
  },
  methods: {
    handleCilck () {
      this.$parent.onChange(this.index)
    }
  },
}
</script>
<style lang="stylus" scoped>
.tab{
  list-style: none;
  line-height: 40px;
  margin-right: 30px;
  position: relative;
  bottom: -2px;
  cursor: pointer;
  display: inline-block;
  }

  &.active{
    border-bottom: 2px solid blue;
  }

  .tab:last-child{
     margin-right: 0;
    }

</style>
