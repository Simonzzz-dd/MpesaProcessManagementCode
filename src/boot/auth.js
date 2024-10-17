import axios from 'axios';
import Cookies from 'js-cookie';


const apiClient = axios.create({
  baseURL: ip, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

const signup = async ({ email, username, ticketId, department }) => {
  try {
    const response = await apiClient.post('/auth/signup', {
      email,
      username,
      ticketId,
      department
    });

    if (response.data.message) {
      console.log(response.data.message); // Log the message for the user
    }

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


    Cookies.remove('isAdmin');
    Cookies.remove('isViewer');
    Cookies.remove('isAuditor');
    Cookies.remove('isEditor');

    const roles = response.data?.roles

    roles.forEach(role => {
      if (role === "Admin") {
        Cookies.set('isAdmin', 'true', { expires: 7 });
        console.log(`Cookie set for role: ${role}`);
      }
      if (role === "View") {
        Cookies.set('isViewer', 'true', { expires: 7 });
        console.log(`Cookie set for role: ${role}`);
      }
      if (role === "Audit log") {
        Cookies.set('isAuditor', 'true', { expires: 7 });
        console.log(`Cookie set for role: ${role}`);
      }
      if (role === "Editor") {
        Cookies.set('isEditor', 'true', { expires: 7 });
        console.log(`Cookie set for role: ${role}`);
      }
    });


    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const getCurrentUser = async (authToken) => {
  try {
    const response = await apiClient.get(`/auth/current-user?authToken=${authToken}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error.response ? error.response.data : error.message);
    throw error;
  }
};
import { boot } from 'quasar/wrappers';
import ip from './ips';

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$auth = { signup, login, getCurrentUser };
});

export { signup, login, getCurrentUser };
