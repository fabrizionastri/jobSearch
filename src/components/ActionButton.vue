<!-- src/components/ActionButton.vue -->
<template>
  <button :class="buttonType">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'ActionButton',
  props: {
    text: {
      type: String,
      required: true
    },
    buttonType: {
      type: String,
      required: false,
      default: 'primary',
      validator(value) {
        return ['primary', 'secondary'].includes(value)
      }
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
