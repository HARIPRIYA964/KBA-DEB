const lodash = require('lodash')

console.log("Hello World")
const newName = "Node.js"
console.log('Hello', `${(newName)}`);

if (newName === 'Node.js'){
    console.log ('Running on Node.js environment');
}
for(let i=0; i<5; i++ ){
    console.log(i+1);
}

let array = [1,2,3,4,5,6];
console.log(lodash.reverse(array));  // lodash using reverse operation
console.log(lodash.capitalize('hello world'))
console.log(lodash.upperCase('hello world'))
