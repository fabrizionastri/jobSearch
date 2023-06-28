import { computed, reactive, toRef } from 'vue'

const person = reactive({ firstName: 'Adam', lastName: 'Smith', })
const title = computed(() => `${person.firstName} ${person.lastName} the Great`)
console.log(title.value)
person.firstName = 'Poppey'
console.log(title.value)
const message = computed(() => `Hello ${title.value}`)
console.log(message.value.length)
person.lastName = 'COCO'
console.log(title.value)
console.log(message.value.length)

let firstName = toRef(person, 'firstName')
const message2 = computed(() => `Hello ${firstName.value}`)
console.log(message2.value)
firstName.value = 'Apple'
console.log(message2.value)
person.firstName = 'Sangoku'
console.log(message2.value)
