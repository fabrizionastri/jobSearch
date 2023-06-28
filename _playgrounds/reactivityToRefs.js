import { computed, reactive, toRefs } from 'vue'

const person = reactive({ firstName: 'Adam', lastName: 'Smith', })
const fullName = computed(() => `${person.firstName} ${person.lastName} the Great`)

const message = computed(() => `Hello ${fullName.value}`)
console.log(message.value)

const { firstName, lastName } = toRefs(person)
const message2 = computed(() => `Goodbye ${firstName.value} ${lastName.value}`)
firstName.value = 'Apple'
console.log(message.value)
lastName.value = 'GogoCart'
console.log(message.value)
console.log(message2.value)
