<template>
  <div class="w-full h-16 bg-white border-b border-solid border-brand-gray-1">
    <div v-if="onJobResultsPage" class="flex items-center h-full px-8">
      <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
      <span><span class="font-bold text-brand-green-1">1653</span> jobs matched</span>
    </div>
    'this.$route.name:' {{ $route.name }} 'this.$route.name === JobResults:'
    {{ $route.name == 'JobResults' }}
  </div>
</template>

<script>
export default {
  name: 'SubNav',
  computed: {
    onJobResultsPage() {
      return this.$route.name == 'JobResults'
    }
  }
}
</script>
