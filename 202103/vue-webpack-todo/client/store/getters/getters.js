export default {
  // 生成业务中可以直接应用的数据,类似于computed,依赖的值有改变，就会重新计算
  fullName(state) {

    return state.name.secondName + '  ' + state.name.firstName
  }
}
