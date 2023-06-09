const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

class StudentProgress extends Model {}

StudentProgress.init(
  {
    idStudentProgress: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    avgSemScore: {
      type: DataTypes.DOUBLE,
    },
    idStudent: {
      type: DataTypes.INTEGER,
      references: {
        model: "Student",
        key: "idStudent",
      },
      require: true,
    },
    idClassSemester:{
      type: DataTypes.INTEGER,
      require: true,
      references: {
        model: "ClassSemester",
        key: "idClassSemester",
      }
    },
  },
  { sequelize, modelName: "StudentProgress" }
);

module.exports = StudentProgress;
