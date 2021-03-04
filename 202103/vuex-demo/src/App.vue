<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <HelloWorld/> -->
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  
  computed:{
    count(){
      return this.$store.state.count
    }
  },
  methods: {
    countIncrease(){
      this.$store.commit('increment', 100)
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
