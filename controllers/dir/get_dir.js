const Directory = require('../../models/dir/directory');

// Get a specific directory by ID and not deleted
const getDirectoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const directory = await Directory.findOne({ _id: id, deleted: false })
      .populate('children')
      .populate({
        path: 'files',
        match: { deleted: false } // Filter out deleted files
      });

    if (!directory) {
      return res.status(404).json({ error: 'Directory not found' });
    }

    res.status(200).json(directory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getDirectoryById;
