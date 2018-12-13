import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: resolve => {
        require(['./components/home/Home'], resolve)
      }
    },
    {
      path: '/access',
      name: 'Access',
      component: resolve => {
        require(['./components/access/Access'], resolve)
      }
    },
    {
      path: '/room/:id',
      name: 'Room',
      component: resolve => {
        require(['./components/room/Room'], resolve)
      }
    },
    {
      path: '*',
      component: resolve => {
        require(['./components/home/Home'], resolve)
      }
    }
  ]
})
