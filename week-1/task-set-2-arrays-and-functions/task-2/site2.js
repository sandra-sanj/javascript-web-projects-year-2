const numbers = [];

// populate array and print contents
for (let i = 1; i <= 5; i++) {
  numbers.push(prompt('Add number to array:'));
}
printArrayContents(numbers);

// check if number exists in array
const checkNumber = prompt('Enter number to check the array for:');
if (numbers.includes(checkNumber)) {
  console.log(`Number ${checkNumber} exists in the array.`);
} else {
  console.log(`Number ${checkNumber} does not exist in the array.`);
}

// remove last item from array and print the array contents
numbers.pop();
printArrayContents(numbers);

// sort array in ascending order and print contents
numbers.sort((a, b) => a - b);
printArrayContents(numbers);

function printArrayContents(array) {
  let arrayContents = '';
  for (let item of array) {
    arrayContents += `${item}, `;
  }
  console.log(`Array contents: [${arrayContents}]`);
}
