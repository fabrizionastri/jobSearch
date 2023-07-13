<template>
  <div>
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const props = defineProps({
  uniqueValues: {
    type: Array<string>,
    required: true
  },
  action: {
    type: Function,
    required: true
  },
  filterName: {
    type: String,
    required: true
  }
})

const selectedValues = ref<string[]>([])
const router = useRouter()

const selectValue = () => {
  console.log('selectValue activated in ', props.filterName)
  props.action(selectedValues.value)
  router.push({ name: 'JobResults' })
  userStore.lastUpdatedFilter = props.filterName
}

const userStore = useUserStore()
userStore.$onAction(({ after, name }) => {
  after(() => {
    console.log('userStore.$onAction activated in ', props.filterName)
    if (name === 'clearFilters') {
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
