<!-- src/App.vue -->
<template>
  <h1 class="text-xl font-bold text-center ms-3">Hello Fabrizio JobSearch!</h1>
  <MainNav />
</template>

<script>
import MainNav from '@/components/MainNav.vue'

export default {
  name: 'App',
  components: {
    MainNav // same as : main-nav
  }
}
</script>
