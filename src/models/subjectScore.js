const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

class SubjectScore extends Model {}

SubjectScore.init(
  {
    idSS: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    avgScore: {
      type: DataTypes.FLOAT(4, 2),
    },
  },
  { sequelize, modelName: "SubjectScore" }
);

module.exports = SubjectScore;
