const subjectReport = require("../models/subjectReport");
const subjectReportDetail = require("../models/subjectReportDetail");
const subjectScore = require("../models/subjectScore");
const progress = require("../models/progress");
const classModel = require("../models/class");
const parameterModel = require("../models/parameter");
const Response = require("../utils/response");
const { Model } = require("sequelize");

class SubjectReportController {
  static async getSubjectReport(req, res, next) {
    try {
      const { semesterId, subjectId } = req.query;

      if (!semesterId || !subjectId)
        throw "semesterId and subjectId are required";

      //find subject report
      const subjectReportDb = await subjectReport.findOne({
        where: {
          SemesterIdSemester: semesterId,
          SubjectIdSubject: subjectId,
        },
      });

      //get the pass subject score
      const passedSubjectScore = await parameterModel.findOne({
        where: {
          name: "PassingScore",
        },
      });
      if (subjectReportDb) {
        //find the subject report details
        const subjectReportDetailDb = await subjectReportDetail.findAll({
          where: {
            SubjectReportIdSR: subjectReportDb.idSR,
          },
        });
        return res.status(200).json(
          Response.successResponse({
            ...subjectReportDb.dataValues,
            detail: subjectReportDetailDb,
          })
        );
      }

      //create report
      const classRatio = {};

      const subjectScoresDb = await subjectScore.findAll({
        where: {
          SubjectIdSubject: subjectId,
        },
      });
      for (let i = 0; i < subjectScoresDb.length; i++) {
        const progressId = subjectScoresDb[i].ProgressIdProgress;
        //get subject score
        const score = subjectScoresDb[i].avgScore;

        //find in progress table
        const progressRecord = await progress.findOne({
          where: {
            idProgress: progressId,
          },
        });
        const classId = progressRecord.ClassIdClass;
        if (classRatio.hasOwnProperty(classId)) {
          if (score > passedSubjectScore.value) classRatio[classId]++;
        } else {
          if (score > passedSubjectScore.value) classRatio[classId] = 1;
        }
      }

      //save the report
      const subjectReportSaved = await subjectReport.create({
        SemesterIdSemester: semesterId,
        SubjectIdSubject: subjectId,
      });

      const result = [];
      if (subjectReportSaved) {
        //create model
        for (let key in classRatio) {
          //find class
          const classDb = await classModel.findByPk(key);
          // get class student number
          const studentNumber = await classDb.number;
          const ratio = ((classRatio[key] / studentNumber) * 100).toFixed(2);
          result.push({
            SubjectReportIdSR: subjectReportSaved.idSR,
            ClassIdClass: key,
            passedNumber: classRatio[key],
            ratio: ratio,
          });
        }
      }
      const response = await subjectReportDetail.bulkCreate(result);
      return res.status(200).json(Response.successResponse(response));
    } catch (e) {
      console.log(e.message);
      return res.status(404).json(Response.errorResponse(e.message));
    }
  }
}
module.exports = SubjectReportController;
