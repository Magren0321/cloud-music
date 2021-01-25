import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

const Home = () => import('../views/Home.vue')
const Login = () => import ('../views/login/login.vue')
const SongListInfo = () => import('../views/songListInfo/songListInfo.vue')
const find = () => import('../views/find/find.vue')

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/login',
    name: 'Login',
    component: Login
  },{
    path:'/songlist',
    name:'songlist',
    component: SongListInfo
  },{
    path:'/find',
    name:'find',
    component: find
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
