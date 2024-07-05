const Directory = require('../../models/dir/directory');

// Soft delete a specific directory by ID
const deleteDirectory = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the directory by ID
    const directory = await Directory.findByIdAndUpdate(id, { deleted: true });

    if (!directory) {
      return res.status(404).json({ error: 'Directory not found' });
    }

    // If the directory has a parent, remove this directory from the parent's children
    if (directory.parent) {
      const parentDirectory = await Directory.findById(directory.parent);
      parentDirectory.children.pull(directory._id);
      await parentDirectory.save();
    }

    res.status(200).json({ message: 'Directory deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = deleteDirectory;
