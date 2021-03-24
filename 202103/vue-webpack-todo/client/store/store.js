
import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV == 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDev, // 防止不通过mutation修改数据，不要在正式环境使用
    state: defaultState,
    mutations,
    getters,
    actions,
    plugins: [
      (store) => { // 只执行一次
        // store.subscribe()
        console.log('my plugin invoked')
      },
      (store) => { // 只执行一次
        // store.subscribe()
        console.log('my2 plugin invoked')
      },
    ]
    /* modules: {
      a: {
        namespaced: true, // 加命名空间，防止冲突
        state: {
          text: 1
        },
        mutations: {
          updateText(state, text){
            console.log('a state', state)
            state.text = text
          }
        },
        getters: {
          textPlus(state, getters, rootState) { // getters是当前的作用下的getters,rootState是根的state
            console.log('getters', getters)
            // return state.text + rootState.count
            return state.text + rootState.b.text
          }
        },
        actions: {
          add({state, commit, rootState}) { // ctx是a模块的context,里面包含state, commit, rootState
            // commit('updateText', rootState.count)
            commit('updateCount', 1234, {root: true})
          }
        }
      },
      b: {
        namespaced: true,
        state: {
          text: 2
        },
        actions: {
          textAction({commit}) {
            commit('a/updateText', 'text test', {root: true})
          }
        }
      }
    } */
  })
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './getters/getters',
      './actions/actions'
    ], () => {
      const newState = require('./state/state').default;
      const newMutations = require('./mutations/mutations').default;
      const newGetters = require('./getters/getters').default;
      const newActions = require('./actions/actions').default;
      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }
  return store
}
