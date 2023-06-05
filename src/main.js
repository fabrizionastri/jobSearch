
import { createApp } from 'vue' // import the function that creates the Vue application
import App from '@/App.vue' // import the top level component of the Vue application

createApp(App) // create the Vue app, using the createApp function with the App component as an argument
  .mount('#app') // mount the Vue app to the element with the id "app" in the DOM
