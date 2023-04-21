const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

class Test extends Model {}

Test.init(
  {
    idTest: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    testName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coefficent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: "coefficent" }
);

module.exports = Test;
