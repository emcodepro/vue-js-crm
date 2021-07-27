import Vue from 'vue'
import App from './App.vue'
import Vuelidate from "vuelidate/src"
import router from './router'
import store from './store'
import dateFilter from "./filters/date.filter"
import currencyFilter from "./filters/currency.filter";
import 'materialize-css/dist/js/materialize.min'
import messagePlugin from './utils/message.plugin'

import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.use(Vuelidate)
Vue.use(messagePlugin)

firebase.initializeApp({
  apiKey: "AIzaSyCe2dpbcwom_7p2vGjJZVZ8XBUYSowL9lY",
  authDomain: "vue-crm-24c1e.firebaseapp.com",
  projectId: "vue-crm-24c1e",
  storageBucket: "vue-crm-24c1e.appspot.com",
  messagingSenderId: "404747009152",
  appId: "1:404747009152:web:a8bdba438c718c1d403a65",
  measurementId: "G-2TW9NNBBZ3"
})

let app;

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
