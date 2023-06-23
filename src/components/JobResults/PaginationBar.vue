<template>
  <div class="mx-auto mb-6">
    <div class="flex flex-row flex-nowrap">
      <p class="flex-grow text-sm">Page {{ currentPage }} / {{ lastPage }}</p>

      <div class="flex items-center justify-center">
        <router-link
          v-if="previousPage"
          role="link"
          :to="{ name: 'JobResults', query: { page: previousPage } }"
          class="mx-3 text-sm font-semibold text-brand-blue-1"
          >Previous
        </router-link>
        <router-link
          v-if="nextPage"
          role="link"
          :to="{ name: 'JobResults', query: { page: nextPage } }"
          class="mx-3 text-sm font-semibold text-brand-blue-1"
          >Next
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaginationBar',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    lastPage: {
      type: Number,
      required: true
    },
    previousPage: {
      type: [Number, null],
      required: true
    },
    nextPage: {
      type: [Number, null],
      required: true
    }
  }
}
</script>
