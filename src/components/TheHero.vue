<template>
  <main>
    <section class="flex flex-col h-screen pt-10 pb-20">
      <div class="grid grid-cols-12">
        <div class="col-span-1cols-start-1"></div>
        <div class="col-span-5 cols-start-2">
          <the-headline />
        </div>
        <div class="col-span-5 cols-start-6">Image</div>
        <div class="col-span-1 cols-start-11"></div>
      </div>
    </section>
  </main>
</template>

<script>
import TheHeadline from './TheHeadline.vue'

export default {
  name: 'TheHero',
  components: {
    TheHeadline
  }
}
</script>
