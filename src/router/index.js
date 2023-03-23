import Vue from 'vue'
import VueRouter from 'vue-router'
import { storage } from '@/util/index.js'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: '',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  }, {
    path: '/home',
    name: 'home-layout',
    redirect: '/home/users',
    component: () => import('@/views/layout/layout.vue'),
    children: [
      {
        path: 'users',
        name: 'users',
        component: () => import('@/views/layout/users/index.vue'),
      }, {
        path: 'rights',
        name: 'rights',
        component: () => import('@/views/layout/power/rights.vue'),
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('@/views/layout/power/roles.vue'),
      },
      {
        path: 'categories',
        name: 'categories',
        component: () => import('@/views/layout/goods/cate.vue'),
      }

    ]
  }, {
    path: '*',
    name: '404',
    component: () => import('@/views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     next()
//   }
//   if (to.path.indexOf('/home') !== -1) {
//     if (storage.get('token')) {
//       next()
//     } else {
//       return next('/login')
//     }
//   }
// })

export default router
