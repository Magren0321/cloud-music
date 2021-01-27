import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

const Home = () => import('../views/Home.vue');
const Login = () => import ('../views/login/login.vue');
const SongListInfo = () => import('../views/songListInfo/songListInfo.vue');
const find = () => import('../views/find/find.vue');
const my = () => import('../views/my/my.vue');
const movie = () => import('../views/movie/movie.vue');
const ranking = () => import('../views/ranking/ranking.vue');

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/my', //路由重定向到/my
    children: [
      {
        path:'/find',
        name:'find',
        component: find
      },{
        path: '/movie',
        name: 'movie',
        component: movie
      },{
        path: '/my',
        name: 'my',
        component: my
      },
    ]
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
    path:'/ranking',
    name:'rank',
    component: ranking
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
