const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

class SemesterReport extends Model {}

SemesterReport.init(
  {
    idSemesterReport: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idSemester: {
      type: DataTypes.INTEGER,
      require: true,
      references: {
        model: "Semester",
        key: "idSemester",
      },
    },
  },
  { sequelize, modelName: "SemesterReport" }
);
module.exports = SemesterReport;
