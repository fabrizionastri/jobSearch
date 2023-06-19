<template>
  <div>
    <h1 class="m-20">Job Page for {{ currentJobId }}</h1>
  </div>
</template>

<script>
export default {
  name: 'JobView',
  computed: {
    currentJobId() {
      return this.$route.params.id // this returns the "id" sections of the dynamically generated route
    }
  }
}
</script>
