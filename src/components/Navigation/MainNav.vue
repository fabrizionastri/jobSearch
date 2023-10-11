<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed left-0 top-0 h-16 w-full bg-white">
      <div class="border-red mx-auto flex h-full flex-nowrap border-b border-solid px-8">
        <router-link :to="{ name: 'Home' }" class="flex h-full items-center text-xl font-bold">
          <img
            class="flex h-14 items-center text-xl"
            src="https://i.imgur.com/2qJtpPg.png"
            alt="VueJs"
          />
          FlexUp Careers
        </router-link>
        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li v-for="menuItem in menuItems" :key="menuItem.text" class="ml-9 h-full first:ml-0">
              <router-link :to="menuItem.url" class="flex h-full items-center py-2.5">
                {{ menuItem.text }}
              </router-link>
            </li>
          </ul>
        </nav>
        <div class="ml-auto flex h-full items-center">
          <profile-image v-if="userStore.isLoggedIn" @click="userStore.logoutUser" />
          <action-button v-else text="Sign In" @click="userStore.loginUser" />
        </div>
      </div>
      <sub-nav v-if="userStore.isLoggedIn" />
    </div>
  </header>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/user' // import the user store

import ActionButton from '@/components/Shared/ActionButton.vue' // we can use any case we want, but PascalCase is recommended in the script
import ProfileImage from '@/components/Navigation/ProfileImage.vue'
import SubNav from '@/components/Navigation/SubNav.vue'

const menuItems = ref([
  { text: 'Teams', url: '/teams' },
  { text: 'Locations', url: '/' },
  { text: 'Life at Google', url: '/' },
  { text: 'How we hire', url: '/' },
  { text: 'Students', url: '/' },
  { text: 'Jobs', url: '/jobs/results' }
])

const userStore = useUserStore()

const headerHeightClass = computed(() => {
  return userStore.isLoggedIn ? 'h-32' : 'h-16'
})
</script>
