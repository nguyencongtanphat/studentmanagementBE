const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");
const SubjectReport = require("./subjectReport") 

class SubjectReportDetail extends Model {}

SubjectReportDetail.init(
  {
    idSRD: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    passedNumber: {
      type: DataTypes.INTEGER,
      require: true,
    },
    ratio: {
      type: DataTypes.DECIMAL(3, 2),
    },
  },
  { sequelize, modelName: "SubjectReportDetail" }
);

module.exports = SubjectReportDetail;
