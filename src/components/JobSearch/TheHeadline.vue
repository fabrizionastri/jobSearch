<template>
  <section class="mb-16">
    <h1 class="text-6xl font-bold tracking-tighter mb-14">
      <span :class="actionClasses">
        {{ action }}
      </span>
      <br />
      for everyone
    </h1>
    <h2 class="text-3xl font-light">Find your next job at Bobo Corp.</h2>
  </section>
</template>

<script lang="ts" setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'

import nextElementInList from '@/utils/nextElementInList'

const action = ref('Build')
const interval = ref<ReturnType<typeof setInterval>>()

const actionClasses = computed(() => {
  return {
    [action.value.toLowerCase()]: true
  }
})

const changeTitle = () => {
  interval.value = setInterval(() => {
    const actions = ['Build', 'Create', 'Design', 'Code']
    action.value = nextElementInList(actions, action.value)
  }, 3000)
}
onMounted(changeTitle)
onBeforeUnmount(() => clearInterval(interval.value))
</script>

<style scoped>
/* scoped means that the styles will only be applied to this component */

.create {
  color: #1a73e8;
}

.design {
  color: #34a853;
}

.build {
  color: #f9ab00;
}

.code {
  color: #d93025;
}
</style>
