<template>
  <main>
    <section class="flex flex-col h-screen pt-10 pb-20">
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
  </main>
</template>

<script>
import TheHeadline from '@/components/TheHeadline.vue'
import JobSearchForm from '@/components/JobSearchForm.vue'

export default {
  name: 'TheHero',
  components: {
    TheHeadline,
    JobSearchForm
  }
}
</script>
