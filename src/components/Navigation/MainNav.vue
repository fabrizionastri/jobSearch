<!-- src/components/Navigation/MainNav.vue -->
<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="top-0 left-0 w-full h-16 bg-white">
      <div class="flex h-full px-8 mx-auto border-b border-solid border-red flex-nowrap">
        <a class="flex items-center h-full text-xl font-bold" :href="url">{{ company }}</a>
        <nav class="h-full ml-12">
          <ul class="flex h-full list-none">
            <li v-for="menuItem in menuItems" :key="menuItem" class="h-full ml-9 first:ml-0">
              <a :href="links" class="flex h-full items-center py-2.5">{{ menuItem }}</a>
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
    <sub-nav v-if="isLoggedIn" />
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
      company: 'Bobo careers',
      url: 'https://careers.google.com',
      menuItems: ['Teams', 'Locations', 'Life at Google', 'How we hire', 'Students', 'Jobs'],
      isLoggedIn: false,
      links: [
        'https://careers.google.com/teams/',
        'https://careers.google.com/locations/',
        'https://careers.google.com/lifeatgoogle/',
        'https://careers.google.com/how-we-hire/',
        'https://careers.google.com/students/',
        'https://careers.google.com/jobs/'
      ]
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
