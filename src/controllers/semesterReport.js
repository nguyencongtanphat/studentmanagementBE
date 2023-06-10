const { query } = require('express');
const progressModel = require('../models/studentprogress');
const Response = require('../utils/response');
const sequelize = require('../utils/sequelize');
const semesterReportModel = require('../models/semesterReport');
const { QueryTypes } = require('sequelize');

class semesterReportController {
    static async getSemesterReport(req, res, next){
        try{
            const semesterId = req.params.id;
            console.log('semester id: ', semesterId);
            let results = await sequelize.query("SELECT * FROM  semesterreport WHERE idSemester = " + semesterId + "", {type: QueryTypes.SELECT});
            //console.log("num of results: ", results.length);
            if(results.length == 0){
                //if database dont have semester report request need.
                await sequelize.query(" INSERT INTO semesterreport (idSemester) VALUES (" + semesterId + ")", {type: QueryTypes.INSERT});
                let reportResults = await sequelize.query("SELECT * FROM  semesterreport WHERE idSemester = " + semesterId + "", {type: QueryTypes.SELECT});
                results = await sequelize.query(
                    "SELECT \
                        cs.idClassSemester, \
                        cs.number, \
                        cs.idClass, \
                        c.name,  \
                        COUNT(sp.IdStudentProgress) as passNumber  \
                    FROM classsemester cs, studentprogress sp, class c \
                    WHERE sp.avgSemScore >= 5.0 and cs.idClassSemester = sp.idClassSemester and sp.idSemester = " + semesterId + " and cs.idClass = c.idClass \
                    GROUP BY cs.idClassSemester, cs.number, cs.idClass", 
                    { type: QueryTypes.SELECT }
                );
                if(results.length > 0){
                    for ( let i = 0; i < results.length; i++ ){
                        results[i]["ratio"] = results[i]['passNumber'] / results[i].number;
                        const [obj, created] = await semesterReportModel.upsert({
                            idSemesterReport: reportResults["idSemesterReport"],
                            idClassSemester: results[i].idClassSemester,
                            passNumber: results[i].passNumber,
                            ratio: results[i].ratio
                        });
                        //delete results[i].idClass;
                        delete results[i].idClassSemester;
                    }
                }
                else throw new Error('No data found');
                console.log(results);
                return res.status(200).json(Response.successResponse(results));
            }
            else{
                results = await sequelize.query("SELECT srd.*, c.name, cs.number FROM  semesterreportdetail srd, class c, classsemester cs  \
                    WHERE idSemesterReport = " + results[0]["idSemesterReport"] + " and cs.idClass = c.idClass and cs.idClassSemester = srd.idClassSemester",
                    {type: QueryTypes.SELECT}
                );
                for ( let i = 0; i < results.length; i++ ){
                    delete results[i].idSemesterReportDetail;
                    delete results[i].idSemesterReport;
                    delete results[i].idClassSemester;
                }
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