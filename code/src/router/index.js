import Vue from 'vue'
import Router from 'vue-router'

const Index = resolve =>require(['@/modules/index/index'],resolve)
const PostDetails = resolve =>require(['@/modules/posts/detail'],resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostDetails
    }
  ]
})
