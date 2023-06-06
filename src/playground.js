export const developer = {
  salary: 10000,
  experience: 4.5,
  techStack: ['Vue', 'HTML', 'CSS'],
  lookingForWork: true,
  doubleSalary() {
    this.salary = this.salary * 2
    this.lookingForWork = false
  }
}

export const evenOrOdd = (num) => {
  if (num % 2 === 0) {
    return 'even'
  } else {
    return 'odd'
  }
}

export const multiply = (num1, num2) => num1 * num2
