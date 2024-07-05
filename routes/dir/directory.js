const express = require('express');
const multer = require('multer');

const createDirectory = require('../../controllers/dir/create_dir');
const createFile = require('../../controllers/dir/create_file');
const getRootItems = require('../../controllers/dir/get_root');
const getDirectoryById = require('../../controllers/dir/get_dir');
const getFileById = require('../../controllers/dir/get_file');
const deleteFile = require('../../controllers/dir/delete_file');
const getUploadedFileById = require('../../controllers/dir/get_uploaded_file');
const deleteUploadedFileById = require('../../controllers/dir/delete_uploaded_file.js');
const deleteDirectory = require('../../controllers/dir/delete_dir');

const storage = multer.memoryStorage(); // Store files in memory before processing
const upload = multer({ storage });
const dirRouter = express.Router();

dirRouter.post('/create-dir', createDirectory);
dirRouter.post('/create-file', upload.array('files', 10), createFile); // Accept up to 10 files

// Read root directories and files
dirRouter.get('/root-items', getRootItems);

// Get specific directory by ID
dirRouter.get('/directory/:id', getDirectoryById);

// Get specific file by ID
dirRouter.get('/file/:id', getFileById);

// Get Upploaded file
dirRouter.get('/uploaded-file/:id', getUploadedFileById);

// Delete uploaded file
dirRouter.delete('/uploaded-file/:id', deleteUploadedFileById);

// Soft delete specific file by ID
dirRouter.delete('/file/:id', deleteFile);

dirRouter.delete('/directory/:id', deleteDirectory);


module.exports = dirRouter;
