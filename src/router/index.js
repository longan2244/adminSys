import Vue from 'vue'
import VueRouter from 'vue-router'
import { LocalStorage } from '@/util/index.js'
const storage = new LocalStorage('admin-')
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
    component: () => import('@/views/layout/layout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/layout/home/index.vue'),
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


router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  }
  if (to.path.indexOf('/home') !== -1) {
    if (storage.get('token')) {
      next()
    } else {
      return next('/login')
    }
  }
})

export default router
