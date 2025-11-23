import {baseUrl, lang} from './variables.js';
import fetchData from './utils/fetchData.js';

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

// api requests
const getRestaurant = async (restaurantId) => {
  try {
    const api = `/api/v1/restaurants/${restaurantId}`;
    const url = baseUrl + api;

    const responseData = await fetchData(url, options);
    //console.log('responseData', responseData);
    return responseData; // return restaurants (data) as list
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};

const getRestaurants = async () => {
  try {
    const api = '/api/v1/restaurants';
    const url = baseUrl + api;

    const responseData = await fetchData(url, options);
    //console.log('responseData', responseData);
    return [...responseData]; // return restaurants (data) as list
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};

const getDailyMenu = async (restaurant) => {
  try {
    const api = `/api/v1/restaurants/daily/${restaurant._id}/${lang}`;
    const url = baseUrl + api;

    const responseData = await fetchData(url, options);
    //console.log('responseData', responseData);
    return responseData;
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

const getWeeklyMenu = async (restaurant) => {
  try {
    //console.log('id', restaurant._id);
    const api = `/api/v1/restaurants/weekly/${restaurant._id}/${lang}`;
    const url = baseUrl + api;

    const responseData = await fetchData(url, options);
    //console.log('responseData', responseData);
    return responseData;
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

const getIsUsernameAvailable = async (username) => {
  try {
    const api = `/api/v1/users/available/${username}`;
    const url = baseUrl + api;

    const responseData = await fetchData(url, options);
    //console.log('responseData', responseData);
    return responseData;
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

const postNewUser = async (user) => {
  try {
    const api = '/api/v1/users';
    const url = baseUrl + api;

    const responseData = await fetchData(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    //console.log('responseData', responseData);
    return responseData;
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

const postLogInUser = async (user) => {
  try {
    const api = '/api/v1/auth/login';
    const url = baseUrl + api;

    const responseData = await fetchData(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    //console.log('responseData', responseData);
    return responseData;
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

const getCurrentUserByToken = async (token) => {
  try {
    const api = '/api/v1/users/token';
    const url = baseUrl + api;

    const responseData = await fetchData(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    //console.log('responseData', responseData);
    return responseData;
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

const putUser = async (token, user) => {
  try {
    const api = '/api/v1/users';
    const url = baseUrl + api;

    const responseData = await fetchData(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    //console.log('responseData', responseData);
    return responseData;
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

const postUserProfilePicture = async (token, formData) => {
  try {
    const api = '/api/v1/users/avatar';
    const url = baseUrl + api;

    const responseData = await fetchData(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    //console.log('responseData', responseData);
    return responseData;
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

export {
  getRestaurant,
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
