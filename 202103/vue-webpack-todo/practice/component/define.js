import Vue from 'vue'

const data = {
  text: 0
}

const component = {
  props: {
    active: Boolean,
    propOne: String
  },
  // props: {
  //   active: {
  //     // type: Boolean,
  //     // required: true, // 必传
  //     validator(value){
  //       debugger
  //       return typeof value === 'boolean'
  //     }
  //   }
  // },
  // props: [
  //   'active',
  //   'propOne'
  // ],
  template: `<div>
      <input type="text" v-model.number="text"/>
      <span @click="handleChange">{{propOne}}</span>
      <div v-show="active">see me if active</div>
    </div>`,
  data() {
    return {
      text: 0
    }

  },
  methods: {
    handleChange(){
     this.$emit('change')
    }
  },
}

// Vue.component('CompOne', component) // 全局注册
new Vue({
  el: '#root',
  template: `<div>
    <comp-one :active="true" :prop-one="prop1" @change="handleChange"></comp-one>
    <comp-one :active="false"></comp-one>

  </div>`,
  data(){
    return {
      prop1: 'text1'
    }
  },
  components: {
    CompOne: component
  },
  methods: {
    handleChange(){
      this.prop1 = `text1 clicked`
    }
  }
})
