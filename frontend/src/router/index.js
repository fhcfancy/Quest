import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import BrowsePage from '../views/BrowsePage.vue'
import AskPage from '../views/AskPage.vue'
import QuestionDetail from '../views/QuestionDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/browse',
    name: 'Browse',
    component: BrowsePage
  },
  {
    path: '/ask',
    name: 'Ask',
    component: AskPage
  },
  {
    path: '/question/:id',
    name: 'QuestionDetail',
    component: QuestionDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

