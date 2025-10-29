const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./models');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
const cors = require('cors');

// Setup allowed origins from environment or fallback
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3001', 'http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Basic root route to test API availability
app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// Central error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

async function startServer() {
  try {
    await db.sequelize.sync({ force: false });
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
}

startServer();
