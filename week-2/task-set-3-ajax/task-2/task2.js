const url = 'https://reqres.in/api/users';
const headers = {
  'x-api-key': 'reqres-free-v1',
  'Content-Type': 'application/json',
};

const userInfo = {
  name: 'Jack',
  job: 'software engineer',
};

const options = {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(userInfo),
};

async function postMethod() {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error('Invalid input!');

    const jsonResponse = await response.json();
    console.log(jsonResponse);
  } catch (error) {
    console.log(error.message);
  }
}

postMethod();
