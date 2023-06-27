<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <!-- :splotlight is the name of a prop that we are sending from the child to the parent -->
      <slot :spotlight="spotlight"></slot>
    </li>
  </ul>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SpotLights',
  data() {
    return {
      spotlights: []
    }
  },
  async mounted() {
    const baseURL = import.meta.env.VITE_API_URL
    const response = await axios.get(`${baseURL}/spotlights`)
    this.spotlights = response.data
  }
}
</script>
