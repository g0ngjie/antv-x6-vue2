import Vue from 'vue'
import VueRouter from 'vue-router'
import x6 from '../views/x6.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'x6',
        component: x6
    },
    {
        path: '*',
        redirect: '/'
    },
]

const router = new VueRouter({
    routes
})

export default router
