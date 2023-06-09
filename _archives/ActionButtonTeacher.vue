<!-- src/components/ActionButton.vue -->
<template>
  <button :class="buttonClass">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'ActionButtonTeacher',
  props: ['text', 'isPrimary'],
  computed: {
    buttonClass() {
      return { primary: this.isPrimary, secondary: !this.isPrimary }
    }
  }
}
</script>

<style scoped>
button {
  @apply rounded px-5 py-3 font-medium ml-5;
}
.primary {
  @apply bg-brand-blue-1 hover:shadow-blue  text-white border-0;
}
.secondary {
  @apply bg-transparent text-brand-blue-1 border hover:bg-brand-blue-2 hover:text-white;
}
</style>
