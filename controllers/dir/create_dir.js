const Directory = require("../../models/dir/directory");


const createDirectory = async (req, res) => {
    const { name, parent } = req.body;
  
    try {
      const newDirectory = new Directory({
        name,
        type: 'directory',
        parent,
      });
      const savedDirectory = await newDirectory.save();
      
      // If the directory has a parent, add this directory to the parent's children
      if (parent) {
        const parentDirectory = await Directory.findById(parent);
        parentDirectory.children.push(savedDirectory._id);
        await parentDirectory.save();
      }
  
      res.status(201).json(savedDirectory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  module.exports = createDirectory