const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models (pass DataTypes explicitly)
db.Category = require('./category.model')(sequelize, DataTypes);
db.SubCategory = require('./subcategory')(sequelize, DataTypes);
db.Product = require('./product.model')(sequelize, DataTypes);

// Define relationships
db.Category.hasMany(db.SubCategory, { foreignKey: 'categoryId', as: 'subcategories', onDelete: 'CASCADE' });
db.SubCategory.belongsTo(db.Category, { foreignKey: 'categoryId', as: 'category' });

db.SubCategory.hasMany(db.Product, { foreignKey: 'subCategoryId', as: 'products', onDelete: 'CASCADE' });
db.Product.belongsTo(db.SubCategory, { foreignKey: 'subCategoryId', as: 'subcategory' });

// If you still want Category -> Product direct association (optional)
// But if Product is linked via SubCategory, this may not be needed
db.Category.hasMany(db.Product, { foreignKey: 'categoryId', as: 'products', onDelete: 'CASCADE' });
db.Product.belongsTo(db.Category, { foreignKey: 'categoryId', as: 'category' });

module.exports = db;
