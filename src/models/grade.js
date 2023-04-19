const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

class Grade extends Model {}

Grade.init(
  {
    idGrade: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.SMALLINT,
      require: true,
    },
  },
  { sequelize, modelName: "Grade" }
);

module.exports = Grade;
