<template>
  <img
    :src="imageUrl"
    class="object-contain w-12 h-12 p-0 m-0 rounded-3xl"
    alt="User profile image"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const imageUrl = ref(
  'https://media.licdn.com/dms/image/C4D03AQFiX7uwoHiWMA/profile-displayphoto-shrink_100_100/0/1552933857847?e=1691625600&v=beta&t=mRK0gQawA69Qvvd_xAHPfURqnchqUGlRymO9twiio9I'
)
</script>
