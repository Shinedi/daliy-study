import Vue from 'vue'
import Component from './func-notification'

const NotificationConstructor = Vue.extend(Component)

const instances = []
let seed = 1
const removeInstance = instance => {
  if (!instance) return
  const len = instances.length
  const index = instances.findIndex(inst => inst.id === instance.id)
  instances.splice(index, 1)

  if (len <= 1) return
  const removeHeight = instance.height
  for (let i = index; i < len - 1; i++) { // 计算删除节点之后的元素高度
    instances[i].verticalOffset = parseInt(instances[i].verticalOffset) - removeHeight - 16
  }
}

function isObjectValueEqual(a, b) {
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);
  if (aProps.length != bProps.length) {
        return false;
  }
  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i]

    var propA = a[propName]
    var propB = b[propName]
    // 2020-11-18更新，这里忽略了值为undefined的情况
  // 故先判断两边都有相同键名
    if(!b.hasOwnProperty(propName)) return false
    if ((propA instanceof Object)) {
      if (isObjectValueEqual(propA, propB)) {
          // return true     这里不能return ,后面的对象还没判断
        } else {
          return false
        }
    } else if (propA !== propB) {
      return false
    } else { }
  }
  return true
}
const notify = options => {
  if (Vue.prototype.$isServer) return // 服务端是没有DOM的

  const { autoClose, ...rest } = options

  const instance = new NotificationConstructor({
    propsData: rest,
    data() {
      return {
        autoClose: autoClose || 3000
      }
    }
  })

  const id = `notification_${seed++}`
  instance.id = id
  debugger
  instance.vm = instance.$mount() // 不传节点的时候，只是生成了一个vue对象，还没有插入到Dom中去
  console.log('instance', instance)
  console.log('vm' ,instance.vm)  // vue对象
  console.log(Object.is(instance.vm, instance)) // true
  document.body.appendChild(instance.$el) // $el是dom节点，放在body下
  instance.visible = true

  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance)
  instance.vm.$on('closed', ()=> {
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el) // 删掉dom节点
    instance.vm.$destroy() // 删掉vm对象
  })
  instance.vm.$on('close', ()=> {
    instance.visible = false
  })
  return instance.vm
}


export default notify
