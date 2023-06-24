import { createApp } from 'vue' // import the function that creates the Vue application
import { createPinia } from 'pinia' // import the function that creates the Pinia store
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' // import the FontAwesomeIcon component
import { library } from '@fortawesome/fontawesome-svg-core' // import the library of FontAwesome icons
import { faAngleDown, faAngleUp, faSearch } from '@fortawesome/free-solid-svg-icons' // import the faSearch icon from the free-solid-svg-icons library

import '@/index.css' // import the CSS styles from the index.css file
import router from '@/router' // import the router from the router.js file
import App from '@/App.vue' // import the top level component of the Vue application

library.add(faSearch) // add the faSearch icon to the library of FontAwesome icons
library.add(faAngleDown) // add the faSearch icon to the library of FontAwesome icons
library.add(faAngleUp) // add the faSearch icon to the library of FontAwesome icons

const pinia = createPinia() // create the Pinia store

createApp(App) // create the Vue app, using the createApp function with the App component as an argument
  .use(pinia) // use the Pinia store
  .use(router) // use the router
  .component(
    'font-awesome-icon', // this is the name of the component that we will use in the HTML
    FontAwesomeIcon // this is the component that we are registering
  ) // register a component globally. This is the builder pattern, so we can chain methods, where each method returns the Vue app and adds a new component
  .mount('#app') // mount the Vue app to the element with the id "app" in the DOM
