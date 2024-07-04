const mongoose = require('mongoose');

// Define the File schema
const fileSchema = new mongoose.Schema({
  deleted: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: [{
    subtitle: {
      type: String,
    },
    text: {
      type: String,
    },
    BPMN_string: {
      type: String,
    },

  }],
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Directory',
    default: null,
  },
  gridFSFileIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'uploads.files',
    required: false,
  }],
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Create the File model using the specific database connection
const File = mongoose.model('File', fileSchema);

module.exports = File;
