
const { Product, Category } = require("../models");
const path = require("path");
const fs = require("fs");

// ===============================
// 📦 Create Product
// ===============================
exports.createProduct = async (req, res) => {
  try {
    const { name, price, quantity, description, rating, CategoryId } = req.body;
    const image = req.file ? req.file.path.replace(/\\/g, "/") : null;

    if (!name || !price || !CategoryId) {
      return res.status(400).json({ message: "Name, price, and category are required" });
    }

    const product = await Product.create({
      name,
      price,
      quantity,
      description,
      rating,
      image,
      CategoryId,
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
      include: [{ model: Category, attributes: ["id", "name"] }],
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
      include: [{ model: Category, attributes: ["id", "name"] }],
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
    const { name, price, quantity, description, rating, CategoryId } = req.body;
    const image = req.file ? req.file.path.replace(/\\/g, "/") : null;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Delete old image if new one uploaded
    if (image && product.image) {
      const oldImagePath = path.join(__dirname, "..", product.image);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
    }

    await product.update({
      name,
      price,
      quantity,
      description,
      rating,
      image: image || product.image,
      CategoryId,
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

    // Delete image file
    if (product.image) {
      const imagePath = path.join(__dirname, "..", product.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error deleting product" });
  }
};
