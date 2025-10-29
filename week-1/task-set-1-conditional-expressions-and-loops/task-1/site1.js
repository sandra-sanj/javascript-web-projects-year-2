const celcius = prompt('Enter temperature in celcius:');
const fahrenheit = (celcius * 9) / 5 + 32;

document.getElementById('celcius').innerHTML = 'celcius: ' + celcius;
document.getElementById('fahrenheit').innerHTML = 'fahrenheit: ' + fahrenheit;
