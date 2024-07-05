import { boot } from 'quasar/wrappers'
import axios from 'axios'
import Cookies from 'js-cookie';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/directories', // Base URL for your API
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



// Helper methods

// Delete a directory
const deleteDirectoryById = async (id) => {
  try {
    const response = await apiClient.delete(`/directory/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting directory:', error.response ? error.response.data : error.message);
    throw error;
  }
};


// Create a directory
const createDirectory = async (data) => {
  try {
    const response = await apiClient.post('/create-dir', data);
    return response.data;
  } catch (error) {
    console.error('Error creating directory:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Create a file
const createFile = async (formData) => {
  try {
    const response = await apiClient.post('/create-file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating file:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Get root items
const getRootItems = async () => {
  try {
    const response = await apiClient.get('/root-items');
    return response.data;
  } catch (error) {
    console.error('Error fetching root items:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Get a directory by ID
const getDirectoryById = async (id) => {
  try {
    const response = await apiClient.get(`/directory/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching directory:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Get a file by ID
const getFileById = async (id) => {
  try {
    const response = await apiClient.get(`/file/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching file:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Get uploaded file by ID
const getUploadedFileById = async (id) => {
  try {
    const response = await apiClient.get(`/uploaded-file/${id}`, { responseType: 'stream' });
    return response.data;
  } catch (error) {
    console.error('Error fetching uploaded file:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Delete uploaded file by ID
const deleteUploadedFileById = async (id) => {
  try {
    const response = await apiClient.delete(`/uploaded-file/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting uploaded file:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Delete file by ID
const deleteFileById = async (id) => {
  try {
    const response = await apiClient.delete(`/file/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting file:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const downloadFile = async (id, content_type) => {
  try {
    const response = await apiClient.get(`/uploaded-file/${id}`, {
      responseType: 'blob'
    });

    console.log(response.data)

    const blob = new Blob([response.data], { type: content_type});
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;

    // Extract the filename from the Content-Disposition header if available
    const contentDisposition = response.headers['content-disposition'];
    let fileName = 'downloadedFile';
    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
      if (fileNameMatch.length === 2) {
        fileName = fileNameMatch[1];
      }
    }

    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url); // Clean up the URL object

  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};


// Export the helper methods
export default boot(({ app }) => {
  // Add methods to the app instance
  app.config.globalProperties.$directories = {
    deleteFileById,
    downloadFile,
    createDirectory,
    createFile,
    getRootItems,
    getDirectoryById,
    getFileById,
    getUploadedFileById,
    deleteUploadedFileById,
    deleteDirectoryById
  }
})

export {
  downloadFile,
  createDirectory,
  createFile,
  getRootItems,
  getDirectoryById,
  getFileById,
  getUploadedFileById,
  deleteUploadedFileById,
}
