const studentModel = require("../models/student");
const classModel = require("../models/class");
const semesterModel = require("../models/class");

const getStudentInclass = (classId, semesterId) => {
    try{

        const students = studentModel.findAll({
          include: [
            {
              model: classModel,
              where: {
                idClass: classId,
              },
            },
            {
              model: semesterModel,
              where: {
                idSemester: semesterId,
              },
            },
          ],
        });

        return students;
    }catch(e){
        throw new Error(e)
    }
};
class subjectScoreController {
    static async createSubjectScore(req, res, next) {
        const {classId, semesterId} = req.body;
    }
}
