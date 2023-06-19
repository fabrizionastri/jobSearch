<!-- src/App.vue -->
<template>
  <!-- <main-nav /> -->
  <!-- same as : MainNav, but better use kebab case in the template-->
  <!-- <the-hero /> -->
  <router-view />
  <!-- this is a global component, available in all views without need to import it -->
</template>

<script>
// import MainNav from '@/components/Navigation/MainNav.vue'
// import TheHero from '@/components/JobSearch/TheHero.vue'

export default {
  name: 'App'
  // components: {
  // MainNav, // same as : main-nav, but better use PascalCase in the script
  // TheHero
  // }
}
</script>
