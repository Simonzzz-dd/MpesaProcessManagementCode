const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const File = require('../../models/dir/file');

const getFileById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the file document by ID and ensure it's not deleted
    const file = await File.findOne({ _id: id, deleted: false });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Create a new GridFSBucket instance
    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: 'filesBucket'
    });

    // Get file metadata for each GridFS file ID
    const gridFSFileInfos = await Promise.all(
      file.gridFSFileIds.map(async (fileId) => {
        const fileInfo = await mongoose.connection.db.collection('filesBucket.files').findOne({ _id: new mongoose.Types.ObjectId(fileId) });
        return fileInfo;
      })
    );

    // Include the GridFS file info in the response
    res.status(200).json({ ...file.toObject(), gridFSFileInfos });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getFileById;
