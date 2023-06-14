const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

class SubjectTeacherClassSemester extends Model {}

SubjectTeacherClassSemester.init(
  {
    idSubjectTeacherClassSemester: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idClassSemester: {
      type: DataTypes.INTEGER,
      require: true,
      references: {
        model: "ClassSemester",
        key: "idClassSemester",
      },
    },
    idSubjectTeacher: {
      type: DataTypes.INTEGER,
      require: true,
      references: {
        model: "SubjectTeacher",
        key: "idSubjectTeacher",
      },
    },
  },
  { sequelize, modelName: "SubjectTeacherClassSemester" }
);

module.exports = SubjectTeacherClassSemester;
