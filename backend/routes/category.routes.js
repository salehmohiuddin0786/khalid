const express = require('express');
const router = express.Router();
const controller = require('../controllers/category.controller');

// Category routes
router.post('/', controller.create);                        // Create category
router.get('/', controller.findAll);                        // Get all categories with subcategories

// Subcategory routes
router.post('/subcategory', controller.createSubCategory);  // Create subcategory (generic)
router.get('/:categoryId/subcategories', controller.findSubCategoriesByCategory); // Get subcategories for category

module.exports = router;
