<template>
  <div class="py-5 border-b border-solid border-brand-gray-2">
    <div
      class="flex flex-wrap items-center justify-between cursor-pointer"
      role="button"
      @click="toggle"
    >
      <h3 class="text-base font-semibold">{{ header }}</h3>
      <font-awesome-icon :icon="caretIcon" />
    </div>
  </div>
  <div v-if="isOpen" class="w-full mt-5">
    <slot>Default content</slot>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'CollapsibleAccordion',
  props: {
    header: {
      type: String,
      required: true
    }
  },
  setup() {
    const isOpen = ref(false)
    const caretIcon = computed(() => (isOpen.value ? 'angle-up' : 'angle-down'))
    const toggle = () => {
      isOpen.value = !isOpen.value
    }
    return { isOpen, caretIcon, toggle }
  }
}
</script>
