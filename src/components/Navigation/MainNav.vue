<!-- src/components/Navigation/MainNav.vue -->
<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="top-0 left-0 w-full h-16 bg-white">
      <div class="flex h-full px-8 mx-auto border-b border-solid border-red flex-nowrap">
        <router-link :to="{ name: 'Home' }" class="flex items-center h-full text-xl font-bold">
          <img
            class="h-full p-2 place-self-center"
            src="https://i.imgur.com/2qJtpPg.png"
            alt="VueJs"
          />
          FlexUp Careers
        </router-link>
        <nav class="h-full ml-12">
          <ul class="flex h-full list-none">
            <li v-for="menuItem in menuItems" :key="menuItem.text" class="h-full ml-9 first:ml-0">
              <router-link :to="menuItem.url" class="flex h-full items-center py-2.5">
                {{ menuItem.text }}
              </router-link>
            </li>
          </ul>
        </nav>
        <div class="flex items-center h-full ml-auto">
          <profile-image v-if="isLoggedIn" @click="logOut" />
          <action-button v-else text="Sign In" type="primary" @click="logIn" />
          <action-button text="Big Mama" type="secondary" />
          <!-- we can use any case we want, but kebab-case is recommended in the template -->
        </div>
      </div>
    </div>
    <sub-nav />
  </header>
</template>

<script>
import ActionButton from '@/components/Shared/ActionButton.vue' // we can use any case we want, but PascalCase is recommended in the script
import ProfileImage from '@/components/Navigation/ProfileImage.vue'
import SubNav from '@/components/Navigation/SubNav.vue'

export default {
  name: 'MainNav',
  components: {
    ActionButton, // we can use any case we want, but PascalCase is recommended in the script
    ProfileImage,
    SubNav
  },
  data() {
    return {
      menuItems: [
        { text: 'Teams', url: '/' },
        { text: 'Locations', url: '/' },
        { text: 'Life at Google', url: '/' },
        { text: 'How we hire', url: '/' },
        { text: 'Students', url: '/' },
        { text: 'Jobs', url: '/jobs/results' }
      ],
      isLoggedIn: false
    }
  },
  computed: {
    headerHeightClass() {
      return this.isLoggedIn ? 'h-32' : 'h-16'
    }
  },
  methods: {
    logIn() {
      this.isLoggedIn = true
    },
    logOut() {
      this.isLoggedIn = false
    }
  }
}
</script>
