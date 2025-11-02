const { Product, Category, SubCategory } = require("../models");
const path = require("path");
const fs = require("fs");

// ✅ Helper to generate full public URL for images
const getImageUrl = (req, filename) => {
  return `${req.protocol}://${req.get("host")}/uploads/${filename}`;
};

// ===============================
// 📦 Create Product
// ===============================
exports.createProduct = async (req, res) => {
  try {
    const { name, price, quantity, description, rating, categoryId, subCategoryId } = req.body;

    if (!name || !price || !categoryId || !subCategoryId) {
      return res.status(400).json({
        message: "Name, price, categoryId and subCategoryId are required",
      });
    }

    const imageUrl = req.file ? getImageUrl(req, req.file.filename) : null;

    const product = await Product.create({
      name,
      price,
      quantity,
      description,
      rating,
      image: imageUrl,
      categoryId,
      subCategoryId,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server error while creating product" });
  }
};

// ===============================
// 🧾 Get All Products
// ===============================
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category, as: "category", attributes: ["id", "name"] },
        { model: SubCategory, as: "subcategory", attributes: ["id", "name"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error fetching products" });
  }
};

// ===============================
// 🔍 Get Single Product
// ===============================
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: [
        { model: Category, as: "category", attributes: ["id", "name"] },
        { model: SubCategory, as: "subcategory", attributes: ["id", "name"] },
      ],
    });

    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error fetching product" });
  }
};

// ===============================
// ✏️ Update Product
// ===============================
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, quantity, description, rating, categoryId, subCategoryId } = req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let imageUrl = product.image;

    if (req.file) {
      // ✅ If new image uploaded — remove the old one
      if (product.image) {
        const oldFile = product.image.split("/uploads/")[1];
        const oldImgPath = path.join("uploads", oldFile);
        if (fs.existsSync(oldImgPath)) fs.unlinkSync(oldImgPath);
      }
      imageUrl = getImageUrl(req, req.file.filename);
    }

    await product.update({
      name,
      price,
      quantity,
      description,
      rating,
      image: imageUrl,
      categoryId,
      subCategoryId,
    });

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error updating product" });
  }
};

// ===============================
// ❌ Delete Product
// ===============================
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // ✅ Remove image file properly
    if (product.image) {
      const file = product.image.split("/uploads/")[1];
      const imgPath = path.join("uploads", file);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error deleting product" });
  }
};
