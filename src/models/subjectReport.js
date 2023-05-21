const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

class SubjectReport extends Model {}

SubjectReport.init(
  {
    idSubjectReport: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    idSubject: {
      type: DataTypes.INTEGER,
      references: {
        model: "Subject",
        key: "idSubject",
      },
      require: true,
    },
  },
  { sequelize, modelName: "SubjectReport" }
);

module.exports = SubjectReport;
