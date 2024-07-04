const Directory = require('../../models/dir/directory');
const File = require('../../models/dir/file');

// Get all directories and files with null parent
const getRootItems = async (req, res) => {
  try {
    const directories = await Directory.find({ parent: null, deleted: false })
      .populate('children')
      .populate('files');
    const files = await File.find({ parent: null, deleted: false });

    res.status(200).json({ directories, files });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getRootItems;
