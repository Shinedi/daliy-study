import Vue from 'vue'

const component = {
  model: {
    prop: 'value1',
    event: 'haha'
  },
  props: ['value1'],
  template: `
    <div>
      <input type="text" @input="handleInput" :value="value1">
    </div>
  `,
  methods: {
    handleInput(e) {
      this.$emit('haha', e.target.value)
    }
  }
}

new Vue({
  el: '#root',
  components: {
    CompOne: component
  },
  data() {
    return {
      value1: ''
    }
  },
  // <comp-one :value="value1" @input="value1 = arguments[0]"></comp-one>
  // <comp-one v-model="value1"></comp-one>
  template: `
    <div>
      <comp-one v-model="value1"></comp-one>
    </div>
  `,
  methods: {

  }
})
