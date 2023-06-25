<template>
  <div class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-96">
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do ?</h3>
        <div class="flex items-center text-sm">
          <action-button text="Clear filters" type="secondary" />
        </div>
      </div>
      <collapsible-accordion header="Organisation">
        <div class="mt-5">
          <fieldset>
            <ul class="flex flex-row flex-wrap">
              <li>
                <input id="VueTube" type="checkbox" class="mr-3" />
                <label for="VueTube">VueTube</label>
              </li>
              <li>
                <input id="Between Vue" type="checkbox" class="mr-3" />
                <label for="Between Vue" class="pb-1">Between Vue</label>
              </li>
              <li>
                <input id="Et Vue Brute" type="checkbox" class="mr-3" />
                <label for="Et Vue Brute">Et Vue Brute</label>
              </li>
              <li>
                <input id="Vue and a Half Men" type="checkbox" class="mr-3" />
                <label for="Vue and a Half Men">Vue and a Half Men</label>
              </li>
            </ul>
          </fieldset>
        </div>
      </collapsible-accordion>
      <collapsible-accordion header="Job types"> Baby boom </collapsible-accordion>
      <collapsible-accordion header="Degree" />
    </section>
  </div>
</template>

<script>
import ActionButton from '@/components/Shared/ActionButton.vue'
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'

export default {
  name: 'JobFiltersSidebar',
  components: {
    ActionButton,
    CollapsibleAccordion
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
li {
  @apply w-1/2 py-1 leading-tight;
}
</style>
