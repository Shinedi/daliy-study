export default {
  updateCount(state, num) {
    state.count = num
  },
  updateName(state, {name}) {
    state.name.firstName = name
  }
}
