// import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'
export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',  // 匹配的是/app/xxx
    props: true,   // 会把id传到todo组件里面来
    // props: {
    //   id: 456
    // },
    // props: (route)=>({id: route.query.b}),
    // component: Todo,
    component: ()=> import('../views/todo/todo.vue'),
    // components: {
    //   default: Todo,
    //   a: Login
    // },
    name: 'app', // 路由命名
    meta: { // 保存一些想要获取到的信息，拿到路由对象就可以访问这个属性了
      title: 'this is app',
      description: 'ajajai'
    },
    beforeEnter: (to, from, next) => { // 在进入这个路由之前触发
      console.log('app route before enter')
      next()
    }
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    component: Login
    // components: {
    //   default: Login,
    //   a: Todo
    // }
  }
]
