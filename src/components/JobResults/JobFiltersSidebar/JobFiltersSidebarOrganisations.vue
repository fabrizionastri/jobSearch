<template>
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
</template>

<script>
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'

export default {
  name: 'JobFiltersSidebarOrganisations',
  components: {
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
  @apply min-w-[150px] py-1 leading-tight;
}
</style>
