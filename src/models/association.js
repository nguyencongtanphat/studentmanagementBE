const student = require("./student");
const progress = require("./progress");
const grade = require("./grade");
const Class = require("./class");
const semester = require("./semester");
const teacher = require("./teacher");
const subjectReportDetail = require("./subjectReportDetail");
const subjectReport = require("./subjectReport");
const subjectScore = require("./subjectScore");
const subjectScoreDetail = require("./subjectScoreDetail");
const test = require("./test");
const subject = require("./subject");
const semesterReport = require("./semesterReport");

const associate = (_) => {
  //Hocsinh n-n lop (through quatrinhhoc)
  Class.belongsToMany(student, {
    through: { model: progress, unique: false },
  });
  student.belongsToMany(Class, { through: { model: progress, unique: false } });

  //khoilop 1-n lop
  grade.hasMany(Class, {
    foreignKey: "idGrade",
  }),
    Class.belongsTo(grade),
    // lop n - n baocaotongketmon (through ctbaocaotongketmon)
    Class.belongsToMany(subjectReport, { through: subjectReportDetail });
  subjectReport.belongsToMany(Class, { through: subjectReportDetail });

  //hocsinh n - n hocky (through quatrinhhoc)
  semester.belongsToMany(student, {
    through: { model: progress, unique: false },
  });
  student.belongsToMany(semester, {
    through: { model: progress, unique: false },
  });

  //hocky n - n giaovien (through quatrinhhoc)
  semester.belongsToMany(teacher, {
    through: { model: progress, unique: false },
  });
  teacher.belongsToMany(semester, {
    through: { model: progress, unique: false },
  });

  //hocky n - n lop (through quatrinhhoc)
  semester.belongsToMany(Class, {
    through: { model: progress, unique: false },
  });
  Class.belongsToMany(semester, {
    through: { model: progress, unique: false },
  });

  //giaovien n - n hocsinh (through quatrinhoc)
  teacher.belongsToMany(student, {
    through: { model: progress, unique: false },
  });
  student.belongsToMany(teacher, {
    through: { model: progress, unique: false },
  });

  //lop n - n giaovien
  Class.belongsToMany(teacher, { through: { model: progress, unique: false } });
  teacher.belongsToMany(Class, { through: { model: progress, unique: false } });

  //hocky n - n monhoc
  semester.belongsToMany(subject, { through: subjectReport });
  subject.belongsToMany(semester, { through: subjectReport });

  //monhoc n - n giaovien
  subject.belongsToMany(teacher, { through: subjectScore });
  teacher.belongsToMany(subject, { through: subjectScore });

  //monhoc n - n quatrinhhoc
  subject.belongsToMany(progress, { through: subjectScore });
  progress.belongsToMany(subject, { through: subjectScore });

  //giaovien n - n quatrinhhoc
  teacher.belongsToMany(progress, { through: subjectScore });
  progress.belongsToMany(teacher, { through: subjectScore });

  //bangdiemmon n - n loaikiemtra (through ctbangdiemmon)
  subjectScore.belongsToMany(test, { through: subjectScoreDetail });
  test.belongsToMany(subjectScore, { through: subjectScoreDetail });

  //lop n - n hocky (through baocaotongkethocky
  semester.belongsToMany(Class, { through: semesterReport });
  Class.belongsToMany(semester, { through: semesterReport });
};

module.exports = associate;
