module.exports = (sequelize, DataTypes) => {
  const SubCategory = sequelize.define("SubCategory", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  SubCategory.associate = (models) => {
    SubCategory.belongsTo(models.Category, {
      foreignKey: "categoryId",
      as: "category",
    });

    SubCategory.hasMany(models.Product, {
      foreignKey: "subCategoryId",
      as: "products",
    });
  };

  return SubCategory;
};
