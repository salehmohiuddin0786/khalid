module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Category.associate = (models) => {
    Category.hasMany(models.SubCategory, {
      foreignKey: "categoryId",
      as: "subcategories", // This alias must match in controller
      onDelete: "CASCADE",
    });
  };

  return Category;
};
