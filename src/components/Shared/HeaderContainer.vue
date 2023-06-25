<template>
  <div class="w-full border-b border-solid border-brand-gray-1">
    <div class="mx-auto my-16 text-center">
      <h1>
        <slot name="title"> Sample title </slot>
      </h1>
      <h2>
        <slot name="subtitle"> Sample subtitle </slot>
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderContainer'
}
</script>

<style>
h1 {
  @apply my-4 w-full text-xl font-normal;
}

h2 {
  @apply my-4 w-full text-base font-light;
}
</style>
