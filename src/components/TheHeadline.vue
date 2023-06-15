<template>
  <section class="mb-16">
    <h1 class="text-6xl font-bold tracking-tighter mb-14">
      <span :class="actionClasses">
        {{ action }}
      </span>
      <br />
      for everyone
    </h1>
    <h2 class="text-3xl font-light">Find your next job at Bobo Corp.</h2>
  </section>
</template>

<script>
import nextElementInList from '@/utils/nextElementInList'

export default {
  name: 'TheHeadline',
  data() {
    return {
      action: 'Build',
      interval: null
    }
  },
  computed: {
    actionClasses() {
      // solution 1 - return an object with true/false for each action
      // return {
      // create: this.action === 'Create',
      // design: this.action === 'Design',
      // build: this.action === 'Build',
      // code: this.action === 'Code'
      // }
      // solution 2 - return an object with true property for the required class only
      // return {
      // remember to use [] when using a variable as a property name
      // [this.action.toLowerCase()]: true
      // }
      // solution 3 - create just the value, without the property name
      return this.action.toLowerCase()
    }
  },
  created() {
    this.changeTitle()
    console.log('TheHeadline.vue created with data: ', this.action)
  },
  beforeUnmount() {
    // we need to stop the setInterval() function when the component is unmounted
    clearInterval(this.interval)
  },
  methods: {
    changeTitle() {
      this.interval = setInterval(() => {
        const actions = ['Build', 'Create', 'Design', 'Code']
        this.action = nextElementInList(actions, this.action)
        // console.log('TheHeadline.vue changeTitle() with data: ', this.action)
      }, 5000)
    }
  }
}
</script>

<style scoped>
/* scoped means that the styles will only be applied to this component */

.create {
  color: #1a73e8;
}

.design {
  color: #34a853;
}

.build {
  color: #f9ab00;
}

.code {
  color: #d93025;
}
</style>
