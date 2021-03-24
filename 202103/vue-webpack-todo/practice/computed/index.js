import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      Name: {{name}}
      <p>Name: {{getName()}}</p>
      <p>Name: {{number}}</p>
      <p>fullName: {{fullName}}</p>
      <input type="text" v-model="number"/>
      firstName:<input type="text" v-model="firstName"/>
      lastName:<input type="text" v-model="lastName"/>
      obj.a: <input type="text" v-model="obj.a"/>

    </div>
  `,
  data(){
    return {
      firstName: 'bodi',
      lastName: 'fu',
      number: 0,
      fullName: '',
      obj: {
        a: 123
      }
    }
  },
  mounted(){
    // setTimeout(() => {
    //   this.obj = {
    //     a: 456
    //   }
    // }, 2000);

  },
  watch:{
    /* firstName(newVal, val){
      this.fullName = newVal + ' ' + this.lastName // 默认首次不会执行
    }, */
    firstName: {
      handler(newVal, val) {
        this.fullName = newVal + ' ' + this.lastName
      },
      immediate: true, // 立即执行

    },
    /* obj: {
      handler(newVal, val) {
        console.log('obj.a changed')
      },
      immediate: true, // 立即执行
      deep: true // 性能开销大
    }, */
    'obj.a': {
      handler(newVal, val) {
        console.log('obj.a changed')
      },
      // immediate: true, // 立即执行
      // deep: true // 性能开销大
    }
  },
  computed: {
    name(){
      console.log('new name')
      return `${this.firstName} ${this.lastName}`
    }
  },
  methods: {
    getName () {
      console.log('getName') // number变化导致这个方法会被调用，
      return `${this.firstName} ${this.lastName}`
    }
  }
})
