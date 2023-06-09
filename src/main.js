import { createApp } from 'vue' // import the function that creates the Vue application
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' // import the FontAwesomeIcon component
import { library } from '@fortawesome/fontawesome-svg-core' // import the library of FontAwesome icons
import { faSearch } from '@fortawesome/free-solid-svg-icons' // import the faSearch icon from the free-solid-svg-icons library

import '@/index.css' // import the CSS styles from the index.css file
import App from '@/App.vue' // import the top level component of the Vue application

library.add(faSearch) // add the faSearch icon to the library of FontAwesome icons

createApp(App) // create the Vue app, using the createApp function with the App component as an argument
  .component(
    'font-awesome-icon', // this is the name of the component that we will use in the HTML
    FontAwesomeIcon // this is the component that we are registering
  ) // register a component globally. This is the builder pattern, so we can chain methods, where each method returns the Vue app and adds a new component
  .mount('#app') // mount the Vue app to the element with the id "app" in the DOM
