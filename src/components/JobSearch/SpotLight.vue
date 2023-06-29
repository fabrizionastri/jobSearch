<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <!-- :splotlight is the name of a prop that we are sending from the child to the parent -->
      <slot :spotlight="spotlight"></slot>
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import axios from 'axios'
const getSpotlights = async () => {
  const baseURL = import.meta.env.VITE_API_URL
  const response = await axios.get(`${baseURL}/spotlights`)
  spotlights.value = response.data
}
const spotlights = ref([])

onMounted(getSpotlights)
</script>
ù
