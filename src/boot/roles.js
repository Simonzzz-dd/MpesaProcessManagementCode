import { boot } from 'quasar/wrappers'
import axios from 'axios'
import Cookies from 'js-cookie';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Base URL for your API
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(config => {
  const token = Cookies.get('authToken'); // Get the token from cookies
  if (token) {
    if (config.method === 'post' || config.method === 'put') {
      // Add token to request body for POST and PUT requests
      config.data = { ...config.data, authToken: token };
    } else {
      // Add token to URL parameters for GET, DELETE, and other requests
      config.params = { ...config.params, authToken: token };
    }
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Helper methods for roles

// Create a group
const createGroup = async (data) => {
  try {
    const response = await apiClient.post('/roles/create-group', data);
    return response.data;
  } catch (error) {
    console.error('Error creating group:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Add users to a group
const addUsersToGroup = async (data) => {
  try {
    const response = await apiClient.post('/roles/add-users-to-group', data);
    return response.data;
  } catch (error) {
    console.error('Error adding users to group:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Add a directory to a group
const addDirectoryToGroup = async (data) => {
  try {
    const response = await apiClient.post('/roles/add-directory-to-group', data);
    return response.data;
  } catch (error) {
    console.error('Error adding directory to group:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Remove a group from a directory
const removeGroupFromDirectory = async (data) => {
  try {
    const response = await apiClient.post('/roles/remove-group-from-directory', data);
    return response.data;
  } catch (error) {
    console.error('Error removing group from directory:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Assign roles to a user
const assignRolesToUser = async (data) => {
  try {
    const response = await apiClient.post('/roles/assign-roles-to-user', data);
    return response.data;
  } catch (error) {
    console.error('Error assigning roles to user:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Get current user's roles
const getCurrentUserRoles = async () => {
  try {
    const response = await apiClient.get('/roles/get-current-user-role');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user roles:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const getCurrentUserGroups = async () => {
  try {
    const response = await apiClient.get('/roles/get-current-user-groups');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user roles:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Export the helper methods
export default boot(({ app }) => {
  // Add methods to the app instance
  app.config.globalProperties.$roles = {
    createGroup,
    addUsersToGroup,
    addDirectoryToGroup,
    removeGroupFromDirectory,
    assignRolesToUser,
    getCurrentUserRoles,
    getCurrentUserGroups
  }
})

export {
  createGroup,
  addUsersToGroup,
  addDirectoryToGroup,
  removeGroupFromDirectory,
  assignRolesToUser,
  getCurrentUserRoles,
  getCurrentUserGroups
}
