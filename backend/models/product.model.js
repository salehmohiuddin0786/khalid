module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    // 🆕 Foreign key to SubCategory
    subCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  // 🔁 Define relation with SubCategory instead of Category
  Product.associate = (models) => {
    Product.belongsTo(models.SubCategory, {
      foreignKey: "subCategoryId",
      as: "subcategory",
      onDelete: "CASCADE",
    });
  };

  return Product;
};
