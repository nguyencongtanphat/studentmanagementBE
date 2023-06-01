const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

class SemesterReportDetail extends Model {}

SemesterReportDetail.init(
  {
    idSemesterReportDetail: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idSemesterReport: {
      type: DataTypes.INTEGER,
      require: true,
      references: {
        model: "SemesterReport",
        key: "idSemesterReport",
      },
    },
    passedNumber: {
      type: DataTypes.INTEGER,
    },
    ratio: {
      type: DataTypes.DECIMAL(3, 2),
    },
  },
  { sequelize, modelName: "SemesterReportDetail" }
);
module.exports = SemesterReportDetail;
