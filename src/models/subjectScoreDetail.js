const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

class SubjectScoreDetail extends Model {}

SubjectScoreDetail.init(
  {
    idSubjectScoreDetail: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    idSubjectScore: {
      type: DataTypes.INTEGER,
      references: {
        model: "SubjectScore",
        key: "idSubjectScore",
      },
      require: true,
    },
    idTest: {
      type: DataTypes.INTEGER,
      references: {
        model: "Test",
        key: "idTest",
      },
      require: true,
    },
    score: DataTypes.FLOAT(4, 2),
  },
  { sequelize, modelName: "SubjectScoreDetail" }
);

module.exports = SubjectScoreDetail;
