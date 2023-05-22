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
    idGrade: {
      type: DataTypes.INTEGER,
      references: {
        model: "Grade",
        key: "idGrade",
      },
      require: true,
    },
  },
  { sequelize, modelName: "Class" }
);

module.exports = Class;
