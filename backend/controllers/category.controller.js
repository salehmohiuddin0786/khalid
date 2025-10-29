const db = require('../models');
const Category = db.Category;
const SubCategory = db.SubCategory;

// 🔹 Create Category
exports.create = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (err) {
    console.error("Error creating category:", err);
    res.status(500).json({ error: "Server error while creating category" });
  }
};

// 🔹 Get All Categories with Subcategories
exports.findAll = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: SubCategory,
          as: 'subcategories', // must match alias in model association
          attributes: ['id', 'name', 'categoryId'],
        }
      ],
      order: [['id', 'ASC']]
    });

    res.status(200).json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Server error fetching categories" });
  }
};

// 🔹 Create Subcategory under a Category
exports.createSubCategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    if (!name || !categoryId) {
      return res.status(400).json({ error: "Subcategory name and categoryId are required" });
    }

    const parentCategory = await Category.findByPk(categoryId);
    if (!parentCategory) {
      return res.status(404).json({ error: "Parent category not found" });
    }

    const subCategory = await SubCategory.create({ name, categoryId });
    res.status(201).json(subCategory);
  } catch (err) {
    console.error("Error creating subcategory:", err);
    res.status(500).json({ error: "Server error while creating subcategory" });
  }
};

// 🔹 Get Subcategories for a Specific Category
exports.findSubCategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const subcategories = await SubCategory.findAll({
      where: { categoryId },
      attributes: ['id', 'name', 'categoryId'],
      order: [['id', 'ASC']],
    });

    res.status(200).json(subcategories);
  } catch (err) {
    console.error("Error fetching subcategories:", err);
    res.status(500).json({ error: "Server error fetching subcategories" });
  }
};
