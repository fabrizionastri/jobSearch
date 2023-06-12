<!-- src/App.vue -->
<template>
  <main-nav />
  <!-- same as : MainNav, but better use kebab case in the template-->
  <the-hero />
</template>

<script>
import MainNav from '@/components/MainNav.vue'
import TheHero from '@/components/TheHero.vue'

export default {
  name: 'App',
  components: {
    MainNav, // same as : main-nav, but better use PascalCase in the script
    TheHero
  }
}
</script>
