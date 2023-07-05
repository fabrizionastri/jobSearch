<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <!-- :splotlight is the name of a prop that we are sending from the child to the parent -->
      <slot :spotlight="spotlight"></slot>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import axios from 'axios'

interface Spotlight {
  id: number
  img: string
  title: string
  description: string
}

const getSpotlights = async () => {
  const baseURL = import.meta.env.VITE_API_URL
  const response = await axios.get<Spotlight[]>(`${baseURL}/spotlights`)
  spotlights.value = response.data
}
const spotlights = ref<Spotlight[]>([])

onMounted(getSpotlights)
</script>
