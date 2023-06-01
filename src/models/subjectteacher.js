const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

class SubjectTeacher extends Model {}

SubjectTeacher.init(
  {
    idSubjectTeacher: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idSubject: {
      type: DataTypes.INTEGER,
      require: true,
      references: {
        model: "Subject",
        key: "idSubject",
      },
    },
    idTeacher: {
      type: DataTypes.INTEGER,
      require: true,
      references: {
        model: "Teacher",
        key: "idTeacher",
      },
    },
  },
  { sequelize, modelName: "SubjectTeacher" }
);

module.exports = SubjectTeacher;
