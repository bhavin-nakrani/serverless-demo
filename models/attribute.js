"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Attribute.hasMany(models.Attribute);
      Attribute.belongsTo(models.Attribute);
      Attribute.belongsTo(models.Status);
    }
  }
  Attribute.init(
    {
      parent_id: DataTypes.INTEGER,
      status_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "Attribute",
      timestamps: false
    }
  );
  return Attribute;
};
