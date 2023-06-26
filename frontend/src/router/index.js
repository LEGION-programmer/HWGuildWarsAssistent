import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainPage from '../views/MainPage.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/mainPage',
    name: 'mainPage',
    component: MainPage
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
