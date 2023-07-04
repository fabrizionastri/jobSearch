<template>
  <div class="py-5 border-b border-solid border-brand-gray-2">
    <div
      role="button"
      class="flex flex-wrap items-center justify-between cursor-pointer"
      @click="open"
    >
      <h3 class="text-base font-semibold">{{ header }}</h3>
      <font-awesome-icon :icon="caretIcon" />
    </div>
  </div>
  <div v-if="isOpen" class="w-full mt-5">
    <slot>Default content</slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
defineProps({
  header: {
    type: String,
    required: true,
    default: 'Default Header'
  }
})
const isOpen = ref(false)
const caretIcon = computed(() => {
  return isOpen.value ? 'angle-up' : 'angle-down'
})
const open = () => {
  isOpen.value = !isOpen.value
}
</script>
