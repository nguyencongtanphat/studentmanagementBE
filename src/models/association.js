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
    Class.belongsToMany(subjectReport, { through: {model:subjectReportDetail, unique: false} });
  subjectReport.belongsToMany(Class, { through: {model:subjectReportDetail, unique: false} });

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
  semester.belongsToMany(subject, { through: {model:subjectReport, unique: false} });
  subject.belongsToMany(semester, { through: {model:subjectReport, unique: false} });

  //monhoc n - n giaovien
  subject.belongsToMany(teacher, { through: {model:subjectScore, unique:false} });
  teacher.belongsToMany(subject, { through: {model:subjectScore, unique:false} });

  //monhoc n - n quatrinhhoc
  subject.belongsToMany(progress, { through: {model:subjectScore, unique:false} });
  progress.belongsToMany(subject, { through: {model:subjectScore, unique:false} });

  //giaovien n - n quatrinhhoc
  teacher.belongsToMany(progress, { through: {model:subjectScore, unique:false} });
  progress.belongsToMany(teacher, { through: {model:subjectScore, unique:false} });

  //bangdiemmon n - n loaikiemtra (through ctbangdiemmon)
  subjectScore.belongsToMany(test, { through: {model:subjectScoreDetail, unique:false} });
  test.belongsToMany(subjectScore, { through: {model:subjectScoreDetail, unique:false} });

  //lop n - n hocky (through baocaotongkethocky
  semester.belongsToMany(Class, { through: {model:semesterReport, unique:false} });
  Class.belongsToMany(semester, { through: {model:semesterReport, unique:false} });
};

module.exports = associate;
