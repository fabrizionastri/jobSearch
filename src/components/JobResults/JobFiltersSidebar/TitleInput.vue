<template>
  <div class="my-2">
    <label for="title-input" class="text-base font-semibold">Search for job title</label>
    <input
      id="title-input"
      v-model.lazy.trim="searchTitle"
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

const searchTitle = computed({
  get() {
    return userStore.searchTitle
  },
  set(value: string) {
    userStore.setSearchTitle(value)
  }
})
</script>
