import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import JobResultsView from '@/views/JobResultsView.vue'
import JobView from '@/views/JobView.vue'
import TeamsView from '@/views/TeamsView.vue'

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
  },
  {
    path: '/teams',
    name: 'Teams',
    component: TeamsView
  },
  {
    path: '/jobs/results/:id',
    name: 'JobListing',
    component: JobView
  }
]

const router = createRouter({
  // this is used to create the single object router
  history: createWebHashHistory(),
  // this is used to create hash history
  routes,
  scrollBehavior() {
    // this is used to scroll to the top of the page when navigating to a new page
    return {
      top: 0,
      left: 0,
      behavior: 'smooth'
    }
  }
})

export default router
