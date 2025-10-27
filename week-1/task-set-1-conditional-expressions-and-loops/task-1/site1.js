const celcius = prompt('Enter temperature in celcius:');
console.log('celcius: ', celcius);

const fahrenheit = (celcius * 9) / 5 + 32;
console.log('fahrenheit: ', fahrenheit);

document.getElementById('celcius').innerHTML = celcius;
document.getElementById('fahrenheit').innerHTML = fahrenheit;
