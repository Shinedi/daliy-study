import Vue from 'vue'

// const component = {
//   name: 'comp',
//   // template: `<div :style="style">
//   //     <div class="header">
//   //       <slot></slot>
//   //     </div>
//   // </div>`,
//   props: ['prop1'],
//   render(h) {
//     return h('div', {
//       style: this.style,
//       // on: {
//       //   click: ()=> {this.$emit('click')}
//       // }
//     }, [
//       h('div', {
//         class: 'header'
//       }, [
//         this.$slots.header,
//         this.prop1
//       ])
//     ])
//   },
//   data() {
//     return {
//       style: {
//         width: '200px',
//         height: '200px',
//         border: '1px solid #aaa'
//       },
//       value: 'component value'
//     }
//   },
//   mounted() {
//   }
// }

// new Vue({
//   el: '#root',
//   components: {
//     CompOne: component
//   },
//   data() {
//     return {
//       value: 123
//     }
//   },
//   /* template: `
//     <div>
//       <comp-one ref="comp">
//         <span ref="span">{{value}}</span>
//       </comp-one>
//     </div>
//   `, */
//   methods: {
//     handleClick() {
//       console.log('clicked')
//     },
//     handleClickSpan() {
//       console.log('span clicked')
//     }
//   },
//   render(createElement) {
//     return createElement('comp-one', {
//       ref: 'comp',
//       props: {
//         prop1: this.value
//       },
//       nativeOn: {
//         click: this.handleClick
//       }
//       // on: {
//       //   click: this.handleClick
//       // }
//     }, [createElement('span', {
//       ref: 'span',
//       slot: 'header',
//       on: {
//         click: this.handleClickSpan
//       },
//       attrs: {
//         id: 'test-id'
//       },
//       domProps: {
//         innerHTML: `<span>345</span>`
//       } // 这样写之后，this.value就会被替换
//     }, this.value)])
//   }
// })



const component = {
  name: 'comp',
  props: ['prop1'],
  // template: `<div :style="style">
  //     <div class="header">
  //       <slot name="header"></slot>
  //     </div>
  // </div>`,
  render(h) {
    return h('div', {
      style: this.style
    }, [
      h('div', {
        class: 'header',
        // on: {
        //   click: ()=>{this.$emit('click')}
        // }
      }, [this.$slots.header, this.prop1])
    ])
  },
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
  }
}

new Vue({
  el: '#root',
  components: {
    CompOne: component
  },
  data() {
    return {
      value: 123
    }
  },
  mounted() {
  },
  // template:  `
  //   <div>
  //     <comp-one ref="comp">
  //       <span ref="span" slot="header">{{value}}</span>
  //     </comp-one>
  //   </div>
  // `,
  methods: {
    handleClick() {
      console.log('clicked')
    }
  },
  render(h) {
    return h('comp-one', {
      ref: 'comp',
      props: {
        prop1: this.value
      },
      // on: {
      //   click: this.handleClick
      // }
      nativeOn: {
        click: this.handleClick
      }
    }, [
      h('span', {
        ref: 'span',
        slot: 'header',
        attrs: {
          id: 'test'
        },
        // domProps: {
        //   innerHTML: `<span>345</span>`
        // }
      }, this.value)
    ])
  },
})
