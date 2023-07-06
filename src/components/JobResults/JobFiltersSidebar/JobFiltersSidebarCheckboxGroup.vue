<template>
  <collapsible-accordion :header="header">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="value in uniqueValues" :key="value">
            <input
              :id="value"
              v-model="selectedValues"
              :value="value"
              type="checkbox"
              class="mr-3"
              @change="selectValue"
            />
            <label :for="value">{{ value }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'

const props = defineProps({
  header: {
    type: String,
    required: true,
    default: 'Default Header'
  },
  uniqueValues: {
    type: Array<string>,
    required: true
  },
  action: {
    type: Function,
    required: true
  }
})

const selectedValues = ref<string[]>([])
const router = useRouter()

const selectValue = () => {
  props.action(selectedValues.value)
  router.push({ name: 'JobResults' })
}

const userStore = useUserStore()
userStore.$onAction(({ after, name }) => {
  after(() => {
    console.log('hello')
    if (name === 'clearFilters') {
      console.log('yessaaah')
      selectedValues.value = []
    }
  })
})
</script>

<style scoped>
li {
  @apply min-w-[150px] py-1 pr-2 leading-tight;
}
</style>
