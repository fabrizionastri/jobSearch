<template>
  <input
    type="text"
    :value="value"
    class="h-full text-lg font-normal focus:outline-none"
    @input="handleInput"
  />
</template>

<script>
export default {
  name: 'TextInput',
  // emits: ['handleInput'], // this is the event we want to emit
  data() {
    return {
      value: ''
    }
  },
  methods: {
    handleInput(event) {
      // this is the method that will be called when the input event is triggered
      this.value = event.target.value // update the value in the component
      this.$emit('handleInput', this.value) // emit the value to the parent component. $emit is a Vue method. 'input' is the name of the event. this.value is the value we want to emit
    }
  }
}
</script>
