<template>
  <div class="py-5 border-b border-solid border-brand-gray-2">
    <div class="flex flex-wrap items-center justify-between cursor-pointer" @click="open">
      <h3 class="text-base font-semibold">{{ header }}</h3>
      <font-awesome-icon :icon="caretIcon" />
    </div>
  </div>
  <div v-if="isOpen" class="w-full mt-5">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CollapsibleAccordion',
  props: {
    header: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    caretIcon() {
      return this.isOpen ? 'angle-up' : 'angle-down'
    }
  },
  methods: {
    open() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>
