const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

class Teacher extends Model {}

Teacher.init(
  {
    idTeacher: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dayOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("Nam", "Nữ"),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    startedDay: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Teacher" }
);

module.exports = Teacher;
