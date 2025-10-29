const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const productController = require("../controllers/product.controller");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});

// File type validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Invalid file type. Only JPEG, PNG, and WEBP allowed."));
};

// Initialize Multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

// Product routes
router.post("/", upload.single("image"), productController.createProduct);

// GET all products or filter via query e.g. ?gender=Men&category=1
router.get("/", productController.getAllProducts);

// GET single product by ID
router.get("/:id", productController.getProductById);

// UPDATE product with optional new image
router.put("/:id", upload.single("image"), productController.updateProduct);

// DELETE product by ID
router.delete("/:id", productController.deleteProduct);

module.exports = router;
