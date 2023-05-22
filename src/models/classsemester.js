const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

class ClassSemester extends Model {}

ClassSemester.init(
  {
    idClassSemester: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idClass: {
      type: DataTypes.STRING,
      references: {
        model: "Class",
        key: "idClass",
      },
      require: true,
    },
    idSemester: {
      type: DataTypes.INTEGER,
      references: {
        model: "Semester",
        key: "idSemester",
      },
      require: true,
    },
    idTeacher: {
      type: DataTypes.INTEGER,
      require: true,
    },
    number: {
      type: DataTypes.INTEGER,
      require: true,
    },
  },
  { sequelize, modelName: "ClassSemester" }
);

module.exports = ClassSemester;
