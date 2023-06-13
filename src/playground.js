const printMessage = () => {
  console.log('Hello World')
  return 0
}

const interval = setInterval(printMessage, 2000)
// interval is the return value of setInterval, and it's an object
console.log('interval: ', interval)

setTimeout(() => clearInterval(interval), 10100)
// clearInterval is a function that takes an interval object as an argument, and stops it after a given time
