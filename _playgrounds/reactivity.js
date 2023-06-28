import { ref, computed, reactive } from 'vue'

const a = ref(1)
const b = ref(2)
const c = computed(() => a.value + b.value)
console.log('c.value', c.value) // { value: 3 }
a.value = 8
console.log('c.value', c.value) // { value: 10 }

const firstName = ref('John')
const lastName = ref('Doe')
const fullName = computed(() => `${firstName.value} ${lastName.value}`)
console.log('fullName.value', fullName.value) // { value: 'John Doe' }
lastName.value = 'Smith'
console.log('fullName.value', fullName.value) // { value: 'John Smith' }


const person = ref({
  firstName: 'John',
})

let title = computed(() => person.value.firstName + " the Great")

console.log(title.value) // John the Great

person.value.firstName = 'Boris'

console.log(title.value) // Jane the Great

const person2 = reactive({
  firstName: 'Adam',
})

let title2 = computed(() => person2.firstName + " the Feeble")

console.log(title2.value) // John the Great

person2.firstName = 'Poppey'

console.log(title2.value) // Jane the Great


