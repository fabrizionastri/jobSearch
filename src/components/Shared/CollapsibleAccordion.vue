<template>
  <div class="py-4 border-t border-solid border-brand-gray-1">
    <div
      role="button"
      class="flex flex-wrap items-center justify-between cursor-pointer"
      @click="open"
    >
      <h3 class="text-base font-semibold">{{ header }}</h3>
      <div class="flex items-center">
        <!-- Added a div to wrap the counter and the icon -->
        <span
          v-if="counter"
          class="px-3 py-1 mr-5 text-sm text-white rounded-full bg-brand-gray-1"
          >{{ counter }}</span
        >
        <!-- Added classes for padding, background color, text color, and border-radius -->
        <font-awesome-icon :icon="caretIcon" />
      </div>
    </div>
  </div>
  <div v-if="isOpen" class="w-full py-4 border-t border-solid border-brand-gray-2">
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
  },
  counter: {
    type: Number,
    required: false,
    default: 0
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
