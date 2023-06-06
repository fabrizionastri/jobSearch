<!-- src/App.vue -->
<template>
  <h1 class="ms-3 text-center text-xl font-bold">Hello Fabrizio JobSearch!</h1>
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
