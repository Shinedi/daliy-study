import Vue from 'vue'

const ChildComponent = {
  template: `<div>child component {{data.value}}</div>`,
  inject: ['yeye', 'data'],
  mounted() {
    console.log('__', this.$parent.style)
    console.log('yeye', this.yeye)
    console.log('value', this.data.value)
    console.log('yeyey', 1 ,2)
  }
}
let compon_p = null

const component = {
  name: 'comp',
  components: {
    ChildComponent
  },
  // template: `<div :style="style">
  //     <div class="header">
  //       <slot name="header"></slot>
  //     </div>
  //     <div class="body">
  //       <slot name="body"></slot>
  //     </div>
  // </div>`,
  template: `<div :style="style">
      <div class="header">
        <slot name="header" :value="value" aaa="1111"></slot>
        <slot></slot>
        <child-component/>
      </div>
  </div>`,
  data() {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: 'component value'
    }
  },
  mounted() {
    // compon_p = this.$parent
    // console.log('+++', this.$parent === hahah)
  }
}

const hahah = new Vue({
  el: '#root',
  components: {
    CompOne: component
  },
  provide() {
    const data = {}
    Object.defineProperty(data, 'value', {
      get: ()=> this.value,
      enumerable: true
    })
    return {
      yeye: this,
      data
    }
  },
  data() {
    return {
      value: 123
    }
  },
  mounted() {
    // console.log(this.$refs.comp.value)
    // console.log(this.$refs.span)
  },
  template:  `
    <div>
      <comp-one ref="comp">
        <span ref="span" slot="header" slot-scope="props">{{props.value}}-{{props.aaa}}-{{value}}</span>
        <span>456</span>
      </comp-one>
      <input type="text" v-model="value"/>
    </div>
  `
})

function isObjectValueEqual(a, b) {
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  if (aProps.length != bProps.length) {
      return false;
  }

  for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];
      var propA = a[propName];
      var propB = b[propName];
      if ( propA !== propB) {
              return false;
      }
  }
  return true;
}
// console.log('00000',isObjectValueEqual(compon_p, hahah))
