let number = prompt('Enter positive number:');

number = Number(number);

const table = document.getElementById('table');

for (let n1 = 1; n1 <= number; n1++) {
  // generate row to table
  const row = table.insertRow(n1 - 1);

  for (let n2 = 1; n2 <= number; n2++) {
    // calculate result, generate cell and insert result to generated cell
    const multiplicationResult = n1 * n2;
    const cell = row.insertCell(n2 - 1);
    cell.innerHTML = multiplicationResult;
  }
}
