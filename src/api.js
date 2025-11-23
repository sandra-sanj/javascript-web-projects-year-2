import {baseUrl, lang} from './variables.js';
import {fetchData} from './utils.js';

// api requests
const getRestaurants = async () => {
  try {
    const api = '/api/v1/restaurants';
    const url = baseUrl + api;

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetchData(url, options);
    console.log('response', response);
    if (!response.ok) throw new Error('Invalid Input!');

    const data = await response.json();
    console.log('fetch data', data);

    return [...data]; // return restaurants (data) as list
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};

const getDailyMenu = async (restaurant) => {
  try {
    //console.log('id', restaurant._id);
    const api = `/api/v1/restaurants/daily/${restaurant._id}/${lang}`;
    const url = baseUrl + api;

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, options);
    //console.log('response', response);
    if (!response.ok) throw new Error('Invalid Input!');

    const data = await response.json();
    //console.log('fetch data', data);
    return data;
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

const getWeeklyMenu = async (restaurant) => {
  try {
    //console.log('id', restaurant._id);
    const api = `/api/v1/restaurants/weekly/${restaurant._id}/${lang}`;
    const url = baseUrl + api;

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, options);
    //console.log('response', response);
    if (!response.ok) throw new Error('Invalid Input!');

    const data = await response.json();
    //console.log('fetch data', data);
    return data;
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

const getIsUsernameAvailable = async (username) => {
  try {
    const api = `/api/v1/users/available/${username}`;
    const url = baseUrl + api;

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, options);
    //console.log('response', response);
    if (!response.ok) throw new Error('Invalid Input!');

    const data = await response.json();
    //console.log('fetch data', data);
    return data;
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

const postNewUser = async (user) => {
  try {
    const api = '/api/v1/users';
    const url = baseUrl + api;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    const response = await fetch(url, options);
    //console.log('response', response);
    if (!response.ok) throw new Error('Invalid Input!');

    const data = await response.json();
    //console.log('fetch data', data);
    return data;
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

const postLogInUser = async (user) => {
  try {
    const api = '/api/v1/auth/login';
    const url = baseUrl + api;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    const response = await fetch(url, options);
    //console.log('response', response);
    if (!response.ok) throw new Error('Invalid Input!');

    const data = await response.json();
    //console.log('fetch data', data);
    return data;
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

const getCurrentUserByToken = async (token) => {
  try {
    const api = '/api/v1/users/token';
    const url = baseUrl + api;

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, options);
    //console.log('response', response);
    if (!response.ok) throw new Error('Invalid Input!');

    const data = await response.json();
    //console.log('fetch data', data);
    return data;
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

const putUser = async (token, user) => {
  try {
    const api = '/api/v1/users';
    const url = baseUrl + api;

    const options = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };
    console.log(options);

    const response = await fetch(url, options);
    //console.log('response', response);
    if (!response.ok) throw new Error('Invalid Input!');

    const data = await response.json();
    //console.log('fetch data', data);
    return data;
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

const postUserProfilePicture = async (token, formData) => {
  try {
    const api = '/api/v1/users/avatar';
    const url = baseUrl + api;

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };
    console.log(options);

    const response = await fetch(url, options);
    //console.log('response', response);
    if (!response.ok) throw new Error('Invalid Input!');

    const data = await response.json();
    //console.log('fetch data', data);
    return data;
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

export {
  getRestaurants,
  getDailyMenu,
  getWeeklyMenu,
  getIsUsernameAvailable,
  postNewUser,
  postLogInUser,
  getCurrentUserByToken,
  putUser,
  postUserProfilePicture,
};
