const length1 = prompt('Enter length of first triangle side:');
const length2 = prompt('Enter length of second triangle side:');
const length3 = prompt('Enter length of third triangle side:');

let triangleType;

if (length1 && length2 && length3) {
  if (length1 == length2 && length1 == length3) {
    triangleType = 'equilateral';
  } else if (
    (length1 == length2 && length1 != length3) ||
    (length1 == length3 && length1 != length2) ||
    (length2 == length3 && length2 != length1)
  ) {
    triangleType = 'isosceles';
  } else {
    triangleType = 'scalene';
  }
} else {
  triangleType = 'unknown';
}
console.log(triangleType);

document.getElementById('triangle-type').innerHTML = triangleType;
