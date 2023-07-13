<template>
  <input
    id="qualification-input"
    v-model.lazy.trim="searchQualification"
    class="w-full h-12 p-3 my-2 text-base border border-solid rounded border-brand-gray-1 shadow-gray"
    placeholder="empower, embrace, synergize, networks"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const searchQualification = computed({
  get() {
    return userStore.searchQualification
  },
  set(value: string) {
    userStore.setSearchQualification(value)
  }
})
</script>
