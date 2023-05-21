const { query } = require('express');
const progressModel = require('../models/studentprogress');
const Response = require('../utils/response');
const sequelize = require('../utils/sequelize');
const semesterReportModel = require('../models/semesterReport');
const { QueryTypes } = require('sequelize');

class semesterReportController {
    static async getSemesterReport(req, res, next){
        try{
            console.log('semester id: ', req.body.semesterId);
            const semesterId = req.body.semesterId;
            let results = await sequelize.query("SELECT * FROM  semesterreport WHERE SemesterIdSemester = " + semesterId + "", {type: QueryTypes.SELECT});
            //console.log("num of results: ", results.length);
            if(results.length == 0){
                //if database dont have semester report request need.
                results = await sequelize.query("SELECT c.name, c.number, c.idClass, COUNT(p.StudentIdStudent) as passNumber  FROM class c, progress p WHERE p.avgSemScore >= 5.0 and c.idClass = p.ClassIdClass and p.SemesterIdSemester = " + semesterId + " \
                GROUP BY c.name, c.number", 
                { type: QueryTypes.SELECT });
                if(results.length > 0){
                    for ( let i = 0; i < results.length; i++ ){
                        results[i]["ratio"] = results[i]['passNumber'] / results[i].number;
                        const [obj, created] = await semesterReportModel.upsert({
                            SemesterIdSemester: semesterId,
                            ClassIdClass: results[i].idClass,
                            passNumber: results[i].passNumber,
                            ratio: results[i].ratio
                        });
                        delete results[i].idClass;
                    }
                }
                else throw new Error('No data found');
                console.log(results);
                return res.status(200).json(Response.successResponse(results));
            }
            //console.log("found: ", results);
            return res.status(200).json(Response.successResponse(results));
        }
        catch(err){
            return res.status(404).json(Response.errorResponse(404, err.message))
        }
    }
}
module.exports = semesterReportController;