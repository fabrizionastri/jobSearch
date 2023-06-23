<template>
  <div class="w-full h-16 bg-white border-b border-solid border-brand-gray-1">
    <div class="flex items-center h-full px-8">
      <div v-if="onJobResultsPage">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span><span class="text-brand-green-1">1653</span> jobs matched</span>
      </div>
      <div class="flex-1 ml-8 text-right">
        processEnv: {{ processEnv }} <br />
        importEnv: {{ importEnv }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubNav',
  computed: {
    onJobResultsPage() {
      return this.$route.name == 'JobResults'
    },
    processEnv() {
      const processEnv1 = process.env.NODE_ENV
      return processEnv1
    },
    importEnv() {
      const importEnv1 = import.meta.env.VITE_APP_API_URL
      return importEnv1
    }
  }
}
</script>
