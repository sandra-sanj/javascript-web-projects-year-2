const numbers = [];

// append numbers to array till user stops
let continueLoop = true;
do {
  let input = prompt("Enter a number (or 'done' to finish):");
  if (input == 'done') {
    continueLoop = false;
    continue;
  } else {
    numbers.push(input);
  }
} while (continueLoop);

// iterate through the array save even numbers to another array
const evenNumbers = [];
for (let number of numbers) {
  if (number % 2 == 0) {
    evenNumbers.push(number);
  }
}

// place even number array contents to a string
let evenNumbersString = '';
if (evenNumbers.length == 0) {
  evenNumbersString = 'None';
} else {
  for (let number of evenNumbers) {
    evenNumbersString += `${number}, `;
  }
}

// display even numbers in html
document.getElementById('even-numbers').innerHTML += evenNumbersString;
