const numbers = [2, 4, 1, 88, 100, 22, 21];
console.log('unsorted array: ', numbers);

const sortedNumbers = sortArray(numbers);
console.log('sorted array: ', sortedNumbers);

function sortArray(array) {
  return array.toSorted((a, b) => a - b);
}
