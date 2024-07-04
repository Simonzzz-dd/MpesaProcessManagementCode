const File = require('../../models/dir/file');
const Directory = require('../../models/dir/directory');

// Soft delete a specific file by ID
const deleteFile = async (req, res) => {
  const { id } = req.params;

  try {
    const file = await File.findByIdAndUpdate(id, { deleted: true });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = deleteFile;
