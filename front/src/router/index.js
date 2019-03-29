import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import SignIn from '@/components/signIn'

Vue.use(Router)

export default new Router({
    
    routes: [
        {
            path: '/login',
            name: 'SignIn',
            component: SignIn
        },
        {
            path: '/',
            name: 'App',
            component: App
        }
    ]
})