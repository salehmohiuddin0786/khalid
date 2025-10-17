const { Sequelize } = require('sequelize');
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

db.Category = require('./category.model')(sequelize, Sequelize);
db.Product = require('./product.model')(sequelize, Sequelize);

// Relationships
db.Category.hasMany(db.Product, { onDelete: 'CASCADE' });
db.Product.belongsTo(db.Category);

module.exports = db;
