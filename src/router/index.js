import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        layout: 'main'
      },
      component: () => import('../views/Home')
    },
    {
      path: '/categories',
      name: 'Categories',
      meta: {
        layout: 'main'
      },
      component: () => import('../views/Categories')
    },
    {
      path: '/detail',
      name: 'Detail',
      meta: {
        layout: 'main'
      },
      component: () => import('../views/Detail')
    },
    {
      path: '/history',
      name: 'History',
      meta: {
        layout: 'main'
      },
      component: () => import('../views/History')
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        layout: 'empty'
      },
      component: () => import('../views/Login')
    },
    {
      path: '/planning',
      name: 'Planning',
      meta: {
        layout: 'main'
      },
      component: () => import('../views/Planning')
    },
    {
      path: '/profile',
      name: 'Profile',
      meta: {
        layout: 'main'
      },
      component: () => import('../views/Profile')
    },
    {
      path: '/record',
      name: 'Record',
      meta: {
        layout: 'main'
      },
      component: () => import('../views/Record')
    },
    {
      path: '/register',
      name: 'Register',
      meta: {
        layout: 'empty'
      },
      component: () => import('../views/Register')
    },
  ]
})

export default router
