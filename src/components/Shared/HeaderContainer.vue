<template>
  <div class="w-full border-b border-solid border-brand-gray-1">
    <div class="mx-auto my-16 text-center">
      <slot name="title">Sample title</slot>
      <slot name="subtitle">Sample subtitle</slot>
    </div>
  </div>
</template>

<style>
h1 {
  @apply my-4 w-full text-xl font-normal;
}

h2 {
  @apply my-4 w-full text-base font-light;
}
</style>
