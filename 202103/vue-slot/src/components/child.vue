<template>
    <div>
        <p>我是子组件</p>
        <slot name="haha" :data="list"></slot>
    </div>
</template>
<script>
export default {
  name: 'riskPush',
  data () {
    return {
      list: [1, 2, 3]
    }
  }
}
</script>
