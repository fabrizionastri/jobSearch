<template>
  <h1 class="mt-20 ml-5 text-6xl font-bold">Job Results page</h1>
  <button class="mt-20 ml-5" @click="goToHome">Go to Home Page</button>
</template>
"

<script>
export default {
  name: 'JobResultsView',
  computed: {
    experiment() {
      console.log('route:', this.$route)
      console.log('router:', this.$router)
      return 'irrelevant'
    }
  },
  methods: {
    goToHome() {
      this.$router.push(
        // '/', // opton 1: indicate the path as a string
        // { path: '/' }, // option 2: indicate the path url as an object
        { name: 'Home' } // option 3: indicate the path name as an object
      )
    }
  }
}
</script>
