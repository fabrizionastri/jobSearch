<!-- src/components/MainNav.vue -->
<template>
  <header class="w-full text-sm">
    <div class="fixed top-0 left-0 w-full h-16 bg-white">
      <p class="text-xs text-right">Main Nav by Fabrizio Nastri</p>
      <div class="flex h-full px-8 mx-auto border-b border-solid border-red flex-nowrap">
        <a class="flex items-center h-full text-xl" href="/">{{ company }}</a>
        <h2 class="flex items-center h-full ml-8">
          Developed by {{ author.first }}{{ author.last }}
        </h2>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'MainNav',
  data() {
    return {
      company: 'Bobo carrers',
      author: {
        first: 'Fabrizio',
        last: 'Nastri'
      }
      //
    }
  }
}
</script>
