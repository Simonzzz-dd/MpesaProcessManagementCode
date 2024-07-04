import { boot } from 'quasar/wrappers'
import axios from 'axios'
import Cookies from 'js-cookie';


const uploadFiles = async ({ files, title, name, content, parent }) => {
  const token = Cookies.get('authToken'); // Get the token from cookies
  const formData = new FormData();

  // Append all files to the 'files' field
  if ( files.length > 0 ) {
    files.forEach((file) => {
      formData.append('files', file);
    });
  }

  // Append other form fields
  formData.append('title', title);
  formData.append('name', name);
  formData.append('content', JSON.stringify(content)); // Assuming content is an object or array
  formData.append('parent', parent); // Assuming parent is a string or object ID
  console.log("requesting")
  try {
    const response = await axios.post(`http://localhost:3000/directories/create-file?authToken=${token}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
};

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$editorCloudF = { uploadFiles }
})

export { uploadFiles }
