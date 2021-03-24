import Vue from 'vue'

var globalLine = '111' // eslint-disable-line

new Vue({
  el: '#root',
  /* template: `
    <div :id="aaa">
      {{html}}
      <p v-html="html"></p>
    </div>
  `, */
  template: `
    <div :class="{active: !isActive }">
      {{getComputed(arr)}}
      <p :class="[isActive? 'active':'']">1</p>
      <p :class="[{active: !isActive}]">2</p>

      <p v-html="html" :style="style"></p>
    </div>
  `,
  data(){
    return {
      isActive: false,
      arr: [1,2,3],
      html: '<span>123</span>',
      aaa: 'main',
      style: {
        color: 'red',
        appearance: 'none'
      }
    }
  },
  methods: {
    getComputed(arr) {
      return arr.join(',')
    }
  }
})
