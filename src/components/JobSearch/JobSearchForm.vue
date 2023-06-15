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
        <text-input placeholder="Software engineer" @handle-input="updateRole" />
      </div>
      <span
        class="flex items-center flex-1 h-full pl-4 border-l border-r border-solid border-brand-gray-3 bg-brand-gray-2"
        >in</span
      >
      <div class="relative flex items-center flex-1 h-full pl-3">
        <label for="role" class="absolute left-2 -top-8">Where ?</label>
        <text-input placeholder="Paris" @handle-input="updateLocation" />
      </div>
      <action-button text="Search" type="secondary" class="rounded-r-3xl" />
    </div>
  </form>
</template>

<script>
import ActionButton from '@/components/Shared/ActionButton.vue'
import TextInput from '../Shared/TextInput.vue'

export default {
  name: 'JobSearchForm',
  components: {
    ActionButton,
    TextInput
  },
  data() {
    return {
      role: '',
      location: ''
    }
  },
  methods: {
    updateRole(payload) {
      console.log('updateRole payload', payload)
      this.role = payload
    },
    updateLocation(payload) {
      console.log('updateLocation payload', payload)
      this.location = payload
    }
  }
}
</script>
