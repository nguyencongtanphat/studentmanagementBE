const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

class Subject extends Model {}

Subject.init(
  {
    idSubject: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      require: true,
    },
    idTeacher: {
      type: DataTypes.INTEGER,
      references: {
        model: "Teacher",
        key: "idTeacher",
      },
    },
  },
  { sequelize, modelName: "Subject" }
);

module.exports = Subject;
