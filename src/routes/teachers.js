const express = require("express");
const route = express.Router();
const teacherController = require("../controllers/teachers");

route.get('/', teacherController.getAllTeachers);

route.get('/:id', teacherController.getTeacherById);

route.post('/', teacherController.createTeacher);

route.put('/:id', teacherController.updateTeacher);

route.delete('/:id', teacherController.deleteTeacherById);

module.exports = route;
