import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <div v-once>Text: {{text}}</div>
      <div v-html="html"></div>
      <ul>
        <li v-for="(item, index) in arr" :key="item">{{item}}</li>
      </ul>
      <ul>
        <li v-for="(val, key, index) in obj">{{key}}:{{val}}:{{index}}</li>
      </ul>
      <input type="text" v-model.lazy="text"/>
      <input type="checkbox" v-model="active"/>
      <div>
        <input type="checkbox" :value="1" v-model="arr"/>
        <input type="checkbox" :value="2" v-model="arr"/>
        <input type="checkbox" :value="3" v-model="arr"/>
      </div>
      <div>
        <input type="radio" value="one" v-model="picked"/>
        <input type="radio" value="two" v-model="picked"/>
      </div>
    </div>
    `,
  data(){
    return {
      arr: [1,2,3],
      obj: {
        a: 123,
        b: 456,
        c: 789
      },
      text: 0,
      active: false,
      html: `<span>this is html</span>`,
      picked: ''
    }
  }
})
