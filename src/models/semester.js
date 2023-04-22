const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

class Semester extends Model {}

Semester.init(
  {
    idSemester: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order: {
      type: DataTypes.SMALLINT,
      require: true,
    },
    year: {
      type: DataTypes.SMALLINT,
      require: true,
    },
  },
  { sequelize, modelName: "Semester" }
);

module.exports = Semester;
