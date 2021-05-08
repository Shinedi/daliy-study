export default {
  updateCount(state, num) {
    state.count = num
  },
  updateName(state, {name}) {
    state.name.firstName = name
  },
  fillTodos(state, todos) {
    state.todos = todos
  },
  doLogin (state, data) {
    state.user = data
  },
  addTodo (state, todo) {
    state.todos.unshift(todo)
  },
  updateTodo (state, {id,  todo}) {
    state.todos.splice(
      state.todos.findIndex(t => t.id === id), 1, todo
    )
  },
  deleteTodo (state, id) {
    state.todos.splice(
      state.todos.findIndex(t => t.id === id), 1
    )
  },
  deleteAllCompleted (state) {
    state.todos = state.todos.filter(t => !t.completed)
  },
  startLoading (state) {
    state.loading = true
  },
  endLoading (state) {
    state.loading = false
  }
}
