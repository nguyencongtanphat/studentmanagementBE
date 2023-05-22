const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");
const SubjectReport = require("./subjectReport") 

class SubjectReportDetail extends Model {}

SubjectReportDetail.init(
  {
    idSubjectReportDetail: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    idSubjectReport: {
      type: DataTypes.INTEGER,
      references: {
        model: "SubjectReport",
        key: "idSubjectReport",
      },
      require: true,
    },
    idClassSemester: {
      type: DataTypes.INTEGER,
      references: {
        model: "ClassSemester",
        key: "idClassSemester",
      },
      require: true,
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
