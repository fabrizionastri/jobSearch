<template>
  <form class="flex items-center w-full h-12 border border-solid rounded-3xl border-brand-gray-3">
    <font-awesome-icon
      title="Search your next job"
      :icon="[
        'fas', // font awesome solid category
        'search' // search icon
      ]"
      class="ml-5 mr-3"
    />
    <div class="flex flex-1 h-full text-base font-light flex-nowrap">
      <div class="relative flex items-center flex-1 h-full pr-3">
        <label for="role" class="absolute left-0 -top-8">Role</label>
        <input
          v-model="role"
          type="text"
          placeholder="Software engineer"
          class="h-full text-lg font-normal focus:outline-none"
        />
      </div>
      <span
        class="flex items-center flex-1 h-full pl-4 border-l border-r border-solid border-brand-gray-3 bg-brand-gray-2"
        >in</span
      >
      <div class="relative flex items-center flex-1 h-full pl-3">
        <label for="role" class="absolute left-2 -top-8">Where ?</label>
        <input
          v-model="location"
          type="text"
          placeholder="Paris"
          class="h-full text-lg font-normal focus:outline-none"
        />
      </div>
      <action-button text="Search" type="secondary" class="rounded-r-3xl" />
    </div>
  </form>
</template>

<script>
import ActionButton from '@/components/Shared/ActionButton.vue'

export default {
  name: 'JobSearchForm',
  components: {
    ActionButton
  },
  data() {
    return {
      role: '',
      location: ''
    }
  },
  methods: {
    updateRole(event) {
      this.role = event.target.value
    }
  }
}
</script>
