const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

class Progress extends Model {}

Progress.init(
  {
    idProgress: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    avgSemScore: {
      type: DataTypes.DOUBLE,
    },
  },
  { sequelize, modelName: "Progress" }
);

module.exports = Progress;
