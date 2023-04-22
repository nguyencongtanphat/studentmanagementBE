const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

class SubjectScoreDetail extends Model {}

SubjectScoreDetail.init(
  {
    idSSD: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    score: DataTypes.FLOAT(4, 2),
  },
  { sequelize, modelName: "SubjectScoreDetail" }
);

module.exports = SubjectScoreDetail;
