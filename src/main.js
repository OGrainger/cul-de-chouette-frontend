import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import router from './router'
import VueSailsIO from 'vue-sails.io'
import VueResource from 'vue-resource'
import Dice from 'vue-dice-component'
import Notifications from 'vue-notification'

import './../node_modules/vue-dice-component/lib/dice.css'

Vue.use(VueResource);
Vue.use(VueSailsIO, 'https://cul-de-chouette-dev.herokuapp.com/');
Vue.use(Dice);
Vue.use(Notifications)


Vue.http.options.root = 'https://cul-de-chouette-dev.herokuapp.com/';
console.log(Vue.http.options.root)
Vue.config.productionTip = false

Vue.http.interceptors.push((request, next) => {
    /*if (request.url !== '/login') {
      const xToken = window.localStorage.getItem('x-token')
      request.headers.set('X-Token', xToken)
    }*/

    next(response => {
        if ((response.status === 404) || (response.status === 504)) {
            router.push({name: 'Home'})
        }

        if (response.status === 403) router.push({name: 'Access'})
    })
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.userOnly)) {
        const getCookie = name => {
            const cookies = `; ${document.cookie}`.match(`;\\s*${name}=([^;]+)`)
            return cookies ? cookies[1] : ''
        }

        if (getCookie('user')) {
            next()
        } else router.push({name: 'Access'})
    } else next()
})


new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
