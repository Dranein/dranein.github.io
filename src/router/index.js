import Vue from 'vue'
import Router from 'vue-router'

const Index = resolve =>require(['@/modules/index/index'],resolve)


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/classify',
      name: 'classify',
      component: Classify
    },
  ]
})
