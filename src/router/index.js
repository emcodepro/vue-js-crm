import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from "firebase";

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        layout: 'main',
        auth: true
      },
      component: () => import('../views/Home')
    },
    {
      path: '/categories',
      name: 'Categories',
      meta: {
        layout: 'main',
        auth: true
      },
      component: () => import('../views/Categories')
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      meta: {
        layout: 'main',
        auth: true
      },
      component: () => import('../views/Detail')
    },
    {
      path: '/history',
      name: 'History',
      meta: {
        layout: 'main',
        auth: true
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
        layout: 'main',
        auth: true
      },
      component: () => import('../views/Planning')
    },
    {
      path: '/profile',
      name: 'Profile',
      meta: {
        layout: 'main',
        auth: true
      },
      component: () => import('../views/Profile')
    },
    {
      path: '/record',
      name: 'Record',
      meta: {
        layout: 'main',
        auth: true
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

router.beforeEach((to, from, next) => {
  const user = firebase.auth().currentUser
  const authRequired = to.matched.some(r => r.meta.auth)

  if(authRequired && !user) {
    next('/login?message=not-authorized')
  } else {
    next()
  }
})

export default router
