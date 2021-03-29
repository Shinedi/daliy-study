<template>
    <header class ="main-header">
        <h1>Todo123</h1>
    </header>
</template>
<script>
export default {
    computed: {
        $style(){
            return {
                mainHeader: '' // 没有class命名空间冲突，虽然scoped也可以解决
                            // 可以自定义class名称，保密性比较好，其他人都看不懂
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    .main-header
        text-align center
        h1
            font-size 100px
            color rgba(175,47,47,0.4)
            font-weight 400
            margin 20px
</style>
<docs>

    123#456
</docs>
