<script>
export default {
  props: {
    panes: {
      type: Array,
      required: true
    }
  },
  render () {
    let contents = this.panes.map(pane => pane.active ?  pane.$slots.default : null)
    // console.log(contents)
    // const contents = this.panes.forEach(pane => pane.active ?  pane.$slots.default : null)
    // const contents = [null,2,1]
    contents = contents.fil
    return (
      <div>
        {contents}
      </div>
    )
  }
}
</script>
