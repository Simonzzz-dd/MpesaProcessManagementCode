import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});


const signup = async ({ email, password }) => {
  try {
    const response = await apiClient.post('/auth/signup', {
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Error during signup:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const login = async ({ email, password }) => {
  try {
    const response = await apiClient.post('/auth/sign', {
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response ? error.response.data : error.message);
    throw error;
  }
};

import { boot } from 'quasar/wrappers';

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$auth = { signup, login };
});

export { signup, login };
