const x1 = prompt('Enter x1 coordinate: ');
const y1 = prompt('Enter y1 coordinate: ');

const x2 = prompt('Enter x2 coordinate: ');
const y2 = prompt('Enter y2 coordinate: ');

const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
console.log('distance: ', distance);

document.getElementById(
  'distance'
).innerHTML = `Distance from (${x1}, ${y1}) to (${x2}, ${y2}) is ${distance}`;
