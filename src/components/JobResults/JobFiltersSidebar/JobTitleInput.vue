<template>
  <div class="my-2">
    <label for="jobTitle-input" class="text-base font-semibold">Search for job title</label>
    <input
      id="jobTitle-input"
      v-model.lazy.trim="searchJobTitle"
      type="text"
      class="w-full h-12 p-3 my-2 text-base border border-solid rounded border-brand-gray-1 shadow-gray"
      placeholder="Java Coder, Backbone Lead, etc."
    />
  </div>
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
