const progressModel = require("../models/progress");
const subjectScoreModel = require("../models/subjectScore");
const subjectScoreDetailModel = require("../models/subjectScoreDetail");
const subjectModel = require("../models/subject");
const Response = require("../utils/response");

class subjectScoreController {
  static async createSubjectScore(req, res, next) {
    try {
      const { classId, teacherId, semesterId, subjectId, results } = req.body;
      //check  subjectScore is existing in the semester, class, subject
      const subjectScoreCheck = await subjectModel.findOne({
        where: {
          idSubject: subjectId,
        },
        include: [
          {
            model: progressModel,
            where: {
              ClassIdClass: classId,
              SemesterIdSemester: semesterId,
            },
          },
        ],
      });
      console.log("check result: ", subjectScoreCheck);
      if (!subjectScoreCheck) {
        //find the progress and add progress id to results
        for (let i = 0; i < results.length; i++) {
          const { idStudent, avg, ...scores } = results[i];
          //find the progress of each student
          const progress = await progressModel.findOne({
            where: {
              ClassIdClass: classId,
              StudentIdStudent: idStudent,
              SemesterIdSemester: semesterId,
            },
          });
          //create the suject score for the student
          const subjectScore = await subjectScoreModel.create({
            avgScore: avg,
            SubjectIdSubject: subjectId,
            TeacherIdTeacher: teacherId,
            ProgressIdProgress: progress.idProgress,
          });
          //create detail subject score  for student
          for (let testId in scores) {
            for (let j = 0; j < scores[testId].length; j++) {
              await subjectScoreDetailModel.create({
                score: scores[testId][j],
                SubjectScoreIdSS: subjectScore.idSS,
                TestIdTest: testId,
              });
            }
          }
        }
      } else {
        throw new Error(
          "SubjectScore for this subject and semesters is already exist"
        );
      }
      return res.status(200).json(Response.successResponse("success"));
    } catch (e) {
      return res.status(404).json(Response.errorResponse(404, e.message));
    }
  }

  
}

module.exports = subjectScoreController;
