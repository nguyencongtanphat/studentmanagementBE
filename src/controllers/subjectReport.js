const subjectReport = require("../models/subjectReport");
const subjectReportDetail = require("../models/subjectReportDetail");
const subjectScore = require("../models/subjectScore");
const progress = require("../models/progress");
const classModel = require("../models/class");
const parameterModel = require("../models/parameter");
const Response = require("../utils/response");
const { Model } = require("sequelize");
const { QueryTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");



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


      //get the pass subject score
      const passedSubjectScore = await parameterModel.findOne({
        where: {
          name: "PassingScore",
        },
      });
     

      // //save the report
      const subjectReportSaved = await subjectReport.create({
        SemesterIdSemester: semesterId,
        SubjectIdSubject: subjectId,
      });

      
     const results = await sequelize.query(
       `SELECT p.ClassIdClass, c.number, COUNT(p.StudentIdStudent) as passedNumber 
        FROM subjectscore ss, progress p, class c
        WHERE ss.ProgressIdProgress = p.idProgress 
          and c.idClass = p.ClassIdClass
          and ss.SubjectIdSubject = ${subjectId} 
          and p.SemesterIdSemester = ${semesterId} 
          and ss.avgScore >= ${passedSubjectScore.value}
        Group by p.ClassIdClass`,
       { type: QueryTypes.SELECT }
     );

     const subjectReportDetailModels = []
     for (let i = 0; i<results.length;i++){
        const item = {
          SubjectReportIdSR: subjectReportSaved.idSR,
          ClassIdClass: results[i].ClassIdClass,
          passedNumber: results[i].passedNumber,
          ratio: ((results[i].passedNumber / results[i].number) * 100).toFixed(
            2
          ),
        };
        subjectReportDetailModels.push(item);
     }
      const responseReportDetailDB = await await subjectReportDetail.bulkCreate(
        subjectReportDetailModels
      );
      return res.status(200).json(
        Response.successResponse({
          subjectReportSaved,
          detail: responseReportDetailDB,
        })
      );
    } catch (e) {
      console.log(e.message);
      return res.status(404).json(Response.errorResponse(e.message));
    }
  }
}
module.exports = SubjectReportController;
