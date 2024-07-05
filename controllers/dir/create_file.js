const mongoose = require('mongoose');
const Directory = require('../../models/dir/directory');
const File = require('../../models/dir/file');

const createFile = async (req, res) => {
  let { name, title, content, parent } = req.body;
  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "filesBucket",
  });

  if (!req.files) {
    req.files = []
  }

  try {
    // If a parent directory is provided, ensure it exists
    if (parent) {
      const parentDirectory = await Directory.findById(parent);
      if (!parentDirectory) {
        throw new Error('Parent directory does not exist');
      }
    }

    const gridFSFileIds = [];

    const handleUpload = (file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = bucket.openUploadStream({
          filename: file.originalname,
          content_type: file.mimetype,
        });

        // Here we read the buffer before piping
        const bufferStream = require('stream').PassThrough();
        bufferStream.end(file.buffer);

        bufferStream.pipe(uploadStream);

        uploadStream.on('error', (error) => reject(error));

        uploadStream.on('finish', () => resolve(uploadStream.id));
      });
    };

    const uploadPromises = req.files.map(file => handleUpload(file));
    const results = await Promise.all(uploadPromises);
    gridFSFileIds.push(...results);
    console.log("passed")
    if (typeof (content) == "string" ) {
      console.log("parse")
      content = JSON.parse(content)
      console.log(content)
    }
    const newFile = new File({
      name,
      title,
      content: content,
      parent: parent || null,
      gridFSFileIds,
    });

    const savedFile = await newFile.save();
    console.log(savedFile)
    // If a parent directory is provided, add this file to the parent's files
    if (parent) {
      const parentDirectory = await Directory.findById(parent);
      parentDirectory.files.push(savedFile._id);
      await parentDirectory.save();
    }

    res.status(201).json(savedFile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createFile;
