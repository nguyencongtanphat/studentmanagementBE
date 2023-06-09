const progressModel = require("../models/studentprogress");
const subjectScoreModel = require("../models/subjectScore");
const subjectScoreDetailModel = require("../models/subjectScoreDetail");
const subjectModel = require("../models/subject");
const Response = require("../utils/response");
const sequelize = require("../utils/sequelize");
const { QueryTypes } = require("sequelize");

 class subjectScoreController {
   static async getSubjectScoreDetails(req, res, next) {
     try {
       const { idStudent, year, order } = req.query;
       const response = await sequelize.query(
         `
        Select sj.idSubject, detail.score, t.testName, sjscore.avgScore, stcs.idSubjectTeacherClassSemester
        from Test as t inner join subjectscoredetail as detail on t.idTest = detail.idTest
        right join subjectscore as sjscore on detail.idSubjectScore = sjscore.idSubjectScore
        inner join subjectteacherclasssemester as stcs on sjscore.idSubjectTeacherClassSemester = stcs.idSubjectTeacherClassSemester
        inner join subjectteacher as sjteacher on stcs.idSubjectTeacher = sjteacher.idSubjectTeacher
        inner join subject as sj on sj.idSubject = sjteacher.idSubject
        where idStudentProgress in (
          select idStudentProgress
            from studentprogress
            where idStudent in (
            select idStudent
                from student
                where idStudent = ${idStudent}
            ) and idClassSemester in (
            select idClassSemester
                from classsemester
                where idSemester in (
              select idSemester
                    from semester
                    where semester.year = ${year} and semester.order = ${order}
                )
            )
        );`,
         { type: QueryTypes.SELECT }
       );
       return res.status(200).json(Response.successResponse(response));
     } catch (e) {
       return res.status(404).json(Response.errorResponse(404, e.message));
     }
   }

   static async getListOfStudentScores(req, res, next) {
     try {
       const response = await sequelize.query(
         `
        select student.idStudent, student.fullName, class.name, semester.order, progress.avgSemScore, semester.year
        from student right join studentprogress as progress on student.idStudent = progress.idStudent
        left join classsemester as classsem on classsem.idClassSemester = progress.idClassSemester
        left join class on class.idClass = classsem.idClass
        inner join semester on semester.idSemester = classsem.idSemester;`,
         { type: QueryTypes.SELECT }
       );

       return res.status(200).json(Response.successResponse(response));
     } catch (e) {
       return res.status(404).json(Response.errorResponse(404, e.message));
     }
   }

   static async createStudentScores(req, res, next) {
     try {
       const result = req.body.result;
       const create_func = async () => {
         for (let item of result) {
           const {
             idStudentProgress,
             idSubjectTeacherClassSemester,
             ...scores
           } = item;
           console.log(item);
           const subjectScore = await subjectScoreModel.findOne({
             where: {
               idStudentProgress: idStudentProgress,
               idSubjectTeacherClassSemester: idSubjectTeacherClassSemester,
             },
           });
           for (let testId in scores) {
             await subjectScoreDetailModel.destroy({
               where: {
                 idTest: testId,
                 idSubjectScore: subjectScore.idSubjectScore,
               },
             });
             for (let j = 0; j < scores[testId].length; j++) {
               await subjectScoreDetailModel.create({
                 score: scores[testId][j],
                 idSubjectScore: subjectScore.idSubjectScore,
                 idTest: testId,
               });
             }
           }
         }
       };
       create_func();
       return res.status(200).json(Response.successResponse("success"));
     } catch (e) {
       return res.status(404).json(Response.errorResponse(404, e.message));
     }
   }
 }


module.exports = subjectScoreController;
