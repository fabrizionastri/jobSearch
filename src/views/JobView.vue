<template>
  <div>
    <h1 class="m-20">Job Page for {{ currentJobId }}</h1>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentJobId = computed(() => route.params.id) // this returns the "id" sections of the dynamically generated route
</script>
