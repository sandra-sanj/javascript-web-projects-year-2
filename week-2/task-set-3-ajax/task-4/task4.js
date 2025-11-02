async function fetchData(url, options) {
  return fetch(url, options);
}

try {
  const user = {
    name: 'John Doe',
    job: 'Developer',
  };

  const url = 'https://reqres.in/api/users';

  const options = {
    method: 'POST',
    headers: {
      'x-api-key': 'reqres-free-v1',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  const response = await fetchData(url, options);
  console.log(response);
  if (!response.ok) throw new Error('Invalid Input!');

  const userData = await response.json();
  console.log(userData);
} catch (error) {
  console.error('An error occurred:', error);
}
