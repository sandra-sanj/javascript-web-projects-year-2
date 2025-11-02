const url = 'https://reqres.in/api/unknown/23';

const options = {
  method: 'GET',
  headers: {'x-api-key': 'reqres-free-v1'},
};

async function errorHandling() {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error('Invalid input!');

    const jsonResponse = await response.json();
    console.log(jsonResponse);
  } catch (error) {
    console.log(error.message);
  }
}

errorHandling();
