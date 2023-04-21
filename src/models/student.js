const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

class Student extends Model{}

Student.init(
  {
    idStudent: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING,
      require: true,
    },
    address: {
      type: DataTypes.STRING,
      require: true,
    },
    dayOfBirth: {
      type: DataTypes.DATEONLY,
      require: true,
    },
    gender: {
      type: DataTypes.ENUM("Nam", "Nữ"),
      require: true,
    },
    Email: {
      type: DataTypes.STRING,
      require: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  { sequelize, modelName: "Student" }
);

module.exports = Student;
