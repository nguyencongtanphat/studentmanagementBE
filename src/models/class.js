const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

class Class extends Model {}

Class.init(
  {
    idClass: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      require: true,
    },
    number: {
      type: DataTypes.INTEGER,
      require: true,
    },
  },
  { sequelize, modelName: "Class" }
);

module.exports = Class;
