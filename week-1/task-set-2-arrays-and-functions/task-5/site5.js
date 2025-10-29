const numbers = [2, 4, 1, 88, 100, 22, 21];
console.log('unsorted array: ', numbers);

console.log('sorted array (asc): ', sortArray(numbers, 'asc'));
console.log('sorted array (desc): ', sortArray(numbers, 'desc'));

function sortArray(numbers, order) {
  if (order == 'asc') {
    return numbers.toSorted((a, b) => a - b);
  } else if (order == 'desc') {
    return numbers.toSorted((a, b) => b - a);
  }
  return numbers;
}
