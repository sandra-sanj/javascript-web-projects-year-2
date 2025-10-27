const naturalNumber = prompt('Enter positive number:');

let sum = 0;
for (let number = 1; number <= naturalNumber; number++) {
  sum += number;
}

document.getElementById('sum').innerHTML = sum;
