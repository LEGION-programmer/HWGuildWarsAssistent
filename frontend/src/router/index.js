import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainPage from '../views/MainPage.vue'
import EditWar from '../views/EditWar.vue'

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
  {
    path: '/EditWar',
    name: 'editWar',
    component: EditWar
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
