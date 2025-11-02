const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./models');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
const path = require('path');
const cors = require('cors');

// ✅ Allow frontend to access images & API
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
  'http://localhost:3000',
  'http://localhost:3001'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// ✅ Serve uploaded images publicly
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Test API
app.get('/', (req, res) => {
  res.send('✅ Backend API is Running');
});

// ✅ API Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// ✅ Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ message: 'Server internal error', error: err.message });
});

// ✅ Start Server
async function startServer() {
  try {
    await db.sequelize.sync({ force: false });
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error('Unable to start server:', error);
  }
}

startServer();
