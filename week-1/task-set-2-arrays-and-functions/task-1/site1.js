const fruits = ['apple', 'banana', 'orange', 'grape', 'kiwi'];

// print the contents and the length of the array
printArrayContents(fruits);
printArrayLength(fruits);

// display item at array index 2
console.log(`Fruit at index 2: ${fruits[2]}`);

// display last element of array using length property
console.log(`Fruit at last index: ${fruits[fruits.length - 1]}`);

// create and populate vegetables array
const vegetables = [];
for (let i = 1; i <= 3; i++) {
  vegetables.push(prompt('Add vegetable to vegetables array:'));
}

// print the contents and the length of the array
printArrayContents(vegetables);
printArrayLength(vegetables);

function printArrayContents(array) {
  console.log(`Array contents: [${array}]`);
}

function printArrayLength(array) {
  console.log(`Length of array: ${array.length}`);
}
