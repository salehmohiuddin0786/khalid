const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Define multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(uploadDir, 'images'); // Subfolder for images
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File filter to only allow certain file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and WEBP are allowed.'));
  }
};

// Set limits (e.g., file size 5 MB max)
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter,
});

module.exports = upload;
