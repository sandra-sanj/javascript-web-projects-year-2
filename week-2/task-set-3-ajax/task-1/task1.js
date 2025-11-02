const url = 'https://reqres.in/api/users/1';
const headers = {
  headers: {
    'x-api-key': 'reqres-free-v1',
  },
};

async function get() {
  try {
    const response = await fetch(url, headers);
    if (!response.ok) throw new Error('Invalid input!');
    console.log(response);
  } catch (error) {
    console.log(error.message);
  }
}

get();
