<template>
  <main class="flex flex-col h-screen">
    <section class="pt-10 pb-20">
      <div class="grid grid-cols-12">
        <div class="col-span-1cols-start-1"></div>
        <div class="col-span-5 cols-start-2">
          <the-headline />
          <job-search-form />
        </div>
        <div class="self-center col-span-5 cols-start-6 justify-self-center">
          <img class="object-contain h-80 w-80" src="https://i.imgur.com/2qJtpPg.png" alt="VueJs" />
        </div>
        <!-- src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png" -->
        <div class="col-span-1 cols-start-11"></div>
      </div>
    </section>
    <SpotLight class="flex flex-row justify-center pb-16">
      <!-- we are destructuring an object that contains all the props that are passed from the child to the parent -->
      <template #default="{ spotlight }">
        <router-link
          to="/jobs/results"
          class="flex flex-col mx-5 border rounded-lg h-96 w-72 bg-brand-gray-2"
        >
          <img class="object-contain" :src="spotlight.img" />
          <div class="h-48 px-6 py-4 mt-3">
            <h3 class="text-lg font-medium">{{ spotlight.jobTitle }}</h3>
            <p class="mt-3 text-sm">{{ spotlight.description }}</p>
          </div>
          <router-link to="/jobs/results" class="px-6 pb-4 text-sm text-center text-brand-blue-1"
            >See jobs</router-link
          >
        </router-link>
      </template>
    </SpotLight>
  </main>
</template>

<script lang="ts" setup>
import TheHeadline from '@/components/JobSearch/TheHeadline.vue'
import JobSearchForm from '@/components/JobSearch/JobSearchForm.vue'
import SpotLight from '@/components/JobSearch/SpotLight.vue'
</script>
