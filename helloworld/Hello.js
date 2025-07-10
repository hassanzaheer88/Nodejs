//console.log("Hello World")

//console.log(window) //error

//console.log(alert('')); //error
//beacuse many windows funtions and DOM 
// related Ui things are removed from Nodejs.

// --------------------------------------------------------

// to import other files ,we will use require function.

//const math = require('./math')
// console.log(math(2,5))
//or 
const {add,sub} = require("./math") 

console.log(add(2,5))
console.log(sub(2,5))

// const math = require("crypto")  // built in modules.
