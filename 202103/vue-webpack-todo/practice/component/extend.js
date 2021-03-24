import Vue from 'vue'


const component = {
  props: {
    active: Boolean,
    propOne: String
  },
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
  mounted() {
    console.log('comp computed')
  },
  methods: {
    handleChange(){
     this.$emit('change')
    }
  },
}

const parent = new Vue({
  name: 'parent'
})

const component2 = {
  extends: component,
  data() {
    return {
      text: 1
    }
  },
  mounted() {
    // console.log(this.$parent)
    console.log('comp2',this.$parent.$options.name) // Root
    // this.$parent.text = 1234455677
  },
}
new Vue({
  parent,
  el: '#root',
  name: "Root",
  components: {
    comp: component2
  },
  mounted() {
  //  console.log('comp3 computed')
   console.log(this.$parent.$options.name)  // parent
 },
  data(){
    return {
      text: 2
    }
  },
  template: `
    <div>
      <span>{{text}}</span>
      <comp></comp>
    </div>

  `
})

/* const compVue = Vue.extend(component)

new compVue({
  el:'#root',
  propsData: {
    propOne: 'xxx'
  },
  data(){
    return {
      text: 123,
      test: 'jaah'
    }
  },
  mounted() {
    console.log('instance computed')
  },
}) */




