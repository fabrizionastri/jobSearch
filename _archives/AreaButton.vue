<!-- src/components/ActionButton.vue -->
<template>
  <button @click="handleClick">h {{ height }} * w {{ width }} = area {{ area }}</button>
</template>

<script>
export default {
  name: 'AreaButton',
  data() {
    return {
      width: 10,
      height: 5
    }
  },
  computed: {
    area() {
      return this.width * this.height
    }
  },
  methods: {
    handleClick(event) {
      if (event.shiftKey) {
        this.height *= 2
      } else {
        this.width *= 2
      }
    }
  }
}
</script>

<style scoped>
button {
  @apply rounded px-5 py-3 font-medium;
}
</style>
