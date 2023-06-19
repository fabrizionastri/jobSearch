import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import JobResultsView from '@/views/JobResultsView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/jobs/results',
    name: 'JobResults',
    component: JobResultsView
  }
]

const router = createRouter({
  // this is used to create the single object router
  history: createWebHashHistory(), // this is used to create hash history
  routes
})

export default router