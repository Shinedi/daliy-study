<template>
    <div id="app">
        <div id="cover"></div>
        <div id="loading" v-show="loading">
          <loading />
        </div>
        <Header></Header>
        {{count}}
        <p>{{fullName}}</p>
        <!-- <p>textC: {{textC}}</p> -->
        <!-- <p>textPlus: {{textPlus}}</p> -->
        <!-- <Todo></Todo> -->
        <!-- <router-link :to="{name: 'app'}">app</router-link> -->
        <router-link to="/app/123">app123</router-link>
        <router-link to="/app/456">app456</router-link>
        <router-link to="/login">login</router-link>
        <!-- <router-link to="/login/exact">login exact</router-link> -->
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
        <!-- <Notification content="test notify" /> -->
        <button @click="notify">click me1</button>
        <Footer></Footer>
        <!-- <router-view name="a"></router-view> -->
    </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import loading from './components/loading/loading.vue'
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
// import Todo from './views/todo/todo.vue'

console.log(Header.__docs)
export default {
  metaInfo: {
    title: "Shinedi's TODO"
  },
  components: {
      Header,
      Footer,
      loading
      // Todo
  },
  data(){
    return {
      arr: []
    }
  },
  methods: {
    //, 'a/add', 'b/textAction'
    ...mapActions(['updateCountAsync']),
    //, 'a/updateText'
    ...mapMutations(['updateCount']),
    notify() {
       this.$notify({
        content: 'test notify',
        btn: 'close'
      })
    }
  },
  mounted() {

    /* console.log('store', this.$store)

    let i = 1
    this.updateCountAsync({
      num: 5,
      time: 2000
    }) */
    // this['a/add']()
    // this.updateText(123)
    // this['a/updateText'](456)
    // this['b/textAction']()
    // let haha = this['a/textPlus']
    // console.log('ahhaha', haha)
    /* this.$store.dispatch('updateCountAsync', {
      num: 5,
      time: 2000
    }) */
    // this.updateCount(10)
    setInterval(()=> {
      /* this.$store.commit('updateCount', {
        num: i++,
        num2: 2
      }) */
      // this.updateCount(i++)
    }, 1000)

    // this.$store.state.count = 3
    setTimeout(()=> {
      this.$store.commit('updateName', {name: 'di'})
    }, 2000)
    // console.log(this.$route)
  },
  computed: {
    // ...mapState(['count']), // 需要安装babel-preset-stage-1来支持这种语法
    ...mapState({
     loading: state => state.loading,
      // counter: 'count'
      count: state => state.count,
      // textA: state => state.a.text,
      // textC: state => state.c.text
    }),
    /* textA() {
      return this.$store.state.b.text
    }, */
    ...mapGetters({
      fullName: 'fullName',
      // textPlus: 'a/textPlus'
    })
    //...mapGetters(['fullName', 'a/textPlus']),
    /* fullName() {
      return this.$store.getters.fullName
    } */
  }
}
</script>

<style lang="stylus" scoped>
#app
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    #cover
      position absolute
      left 0
      right 0
      top 0
      bottom 0
      background-color #999
      opacity 0.2
      z-index -1
    #loading{
      position fixed
      top 0
      right 0
      bottom 0
      left 0
      background-color rgba(255,255,255,.3)
      z-index 99
      display flex
      align-items center
      justify-content center
}

</style>
