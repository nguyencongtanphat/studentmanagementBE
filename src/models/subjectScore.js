const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

class SubjectScore extends Model {}

SubjectScore.init(
  {
    idSubjectScore: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idStudentProgress: {
      type: DataTypes.INTEGER,
      references: {
        model: "StudentProgress",
        key: "idStudentProgress",
      },
      require: true,
    },
    idSubjectTeacher: {
      type: DataTypes.INTEGER,
      references: {
        model: "SubjectTeacher",
        key: "idSubjectTeacher",
      },
      require: true,
    },
    avgScore: {
      type: DataTypes.FLOAT(4, 2),
    },
  },
  { sequelize, modelName: "SubjectScore" }
);

module.exports = SubjectScore;
