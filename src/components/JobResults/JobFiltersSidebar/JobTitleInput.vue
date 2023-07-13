<template>
  <input
    id="jobTitle-input"
    v-model.lazy.trim="searchJobTitle"
    type="text"
    class="w-full h-12 p-3 text-base border border-solid rounded border-brand-gray-1 shadow-gray"
    placeholder="Java Coder, Backbone Lead, etc."
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const searchJobTitle = computed({
  get() {
    return userStore.searchJobTitle
  },
  set(value: string) {
    userStore.setSearchJobTitle(value)
  }
})
</script>
