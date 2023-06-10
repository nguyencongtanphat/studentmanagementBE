const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

class User extends Model {}

User.init(
  {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("Nam", "Nữ"),
      allowNull: false,
    },
    idTeacher: {
      type: DataTypes.INTEGER,
      references: {
        model: "Teacher",
        key: "idTeacher",
      },
      require: false,
    },
  },
  { sequelize, modelName: "User" }
);

module.exports = User;
