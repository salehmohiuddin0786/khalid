const db = require('../models');
const Category = db.Category;

exports.create = async (req, res) => {
  try {
    const category = await Category.create({ name: req.body.name });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findAll = async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
};
