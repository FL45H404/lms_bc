const httpCodes = require('../helper/httpCodes');
const db = require('../db');

/****************************************************************************************************************************************************
Method Type: addQualification
Parameter list: req.body.employee_id, req.body.qualification_type_id, req.body.qualification_specialization_id, req.body.year_of_pass,
                req.body.specialization, req.body.institute_name, req.body.university, req.body.grade
Purpose: Create Employee Qualification 
Created By and Date: Santoshkumar 11-NOV-2020
Modified By and Date:
Version: V.01
**************************************************************************************************************************************************/

exports.addQualification = async (req, res) => {
    try {
        db.query("select * from employee_qualification ORDER BY employee_qualification_id DESC", (err, result) => {
            if (result.length > 0 && result[0].employee_qualification_id != null) {
            
                var keyid = (result[0].employee_qualification_id);
                var keyLength = keyid.length;
                var previousKey = keyid.substring(0, 3)
                var lastKey = parseInt(keyid.substring(3, keyLength))
                var nextKey = String(lastKey + 1);
                var id = previousKey;
                var lengthofnextkey = nextKey.length;
                while (lengthofnextkey < keyLength - 3) {
                    nextKey = "0" + nextKey;
                    lengthofnextkey += 1;
            
                }
                id += nextKey

            } else {
                id = 'EQN0000001';
            }
            var data = [id,
                req.body.employee_id,
                req.body.qualification_type_id,
                req.body.qualification_specialization_id,
                req.body.year_of_pass,
                req.body.specialization,
                req.body.institute_name,
                req.body.university,
                req.body.grade
            ]
            var insertQuery = 'INSERT INTO employee_qualification(employee_qualification_id, employee_id, qualification_type_id, qualification_specialization_id, year_of_pass, specialization, institute_name, university, grade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            db.query(insertQuery, data, (err, result) => {
                if (err) return res.send(err);
                console.log(data)
                res.status(httpCodes.Created).json({ message: "Employee Qualification Details record added Successfully" })
            })

        })
    } catch (err) {
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }

}




/************************************************************************************************************ 
Method Type: getQualification
Parameter list: NA
Purpose: Get all Qualification 
Created By and Date: Santoshkumar 11-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/
exports.getQualification = async (req, res) => {
    try {
        await db.query('SELECT empQual.employee_id,empProf.employee_name,qualType.qualification_type,qualSpec.qualification_specialization_type, empQual.employee_qualification_id, empQual.qualification_type_id, empQual.qualification_specialization_id,'
            + ' empQual.year_of_pass, empQual.specialization, empQual.institute_name, empQual.university, empQual.grade'
            + ' FROM employee_qualification empQual,qualification_specialization qualSpec,qualification_type qualType, employee_master empProf '
            + ' WHERE empQual.employee_id = empProf.employee_id '
            + ' AND empQual.qualification_type_id = qualType.qualification_type_id'
            + ' AND empQual.qualification_specialization_id = qualSpec.qualification_specialization_id', (err, result) => {
                if (err) return res.send(err);
                console.log(result)
                res.status(httpCodes.OK).json(result);
            })
    } catch (err) {
        res.status(httpCodes.InternalServerError).json({
            error_message: "could not get all Qualification",
            error: err
        })
    }
}
/************************************************************************************************************ 
Method Type: getQualificationById
Parameter list: employee_qualification_id
Purpose: Get Qualification by employee_qualification_id
Created By and Date: Santoshkumar 11-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/
exports.getQualificationById = async (req, res) => {
    try {
        let qualificationId = req.params.employee_qualification_id;
        let sql = 'SELECT empQual.employee_id, empQual.employee_qualification_id, empQual.qualification_type_id, empQual.qualification_specialization_id, '
            + ' empQual.year_of_pass, empQual.specialization, empQual.institute_name, empQual.university, empQual.grade '
            + ' FROM employee_qualification empQual,qualification_specialization qualSpec,qualification_type qualType, employee_master empProf '
            + ' WHERE empQual.employee_id = empProf.employee_id '
            + ' AND empQual.qualification_type_id = qualType.qualification_type_id '
            + ' AND empQual.qualification_specialization_id = qualSpec.qualification_specialization_id '
            + ' AND empQual.employee_qualification_id = ?';
        await db.query(sql, [qualificationId], (err, result) => {
            if (err) return res.send(err);
            if (result == null) {
                res
                    .status(httpCodes.BadRequest)
                    .json({ message: "Qualification Id does not exists" });
            } else {
                res.status(httpCodes.OK).json(result);
            }

        })
    } catch (err) {
        console.log(err.message);
        res.status(httpCodes.InternalServerError).json(err.message);
    }
}
/************************************************************************************************************ 
Method Type: updateQualificationById
Parameter list: employee_qualification_id
Purpose: Update Qualification Type by employee_qualification_id
Created By and Date: Santoshkumar 11-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/
exports.updateQualificationById = async (req, res) => {
    try {
        var employee_qualificationId = req.params.employee_qualification_id;
        var data = [
            req.body.employee_id,
            req.body.qualification_type_id,
            req.body.qualification_specialization_id,
            req.body.year_of_pass,
            req.body.specialization,
            req.body.institute_name,
            req.body.university,
            req.body.grade,
            employee_qualificationId]
        var updateQuery = 'UPDATE employee_qualification SET employee_id=?, qualification_type_id=?, qualification_specialization_id=?, year_of_pass=?, specialization=?, institute_name=?, university=?, grade=? WHERE employee_qualification_id=?';
        await db.query(updateQuery, data, (err, result) => {
            if (err) return res.send(err);
            console.log("Employee Qualification record updated Successfully")
            res.status(httpCodes.Created).json({ message: "Employee Qualification record updated Successfully" })
        })
    } catch (err) {
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
}

exports.deleteQualificationById = async (req, res) => {
    try {
        var Id = req.params.employee_qualification_id;
        var data = [
            Id]
        var deleteQuery = 'DELETE FROM employee_qualification WHERE employee_qualification_id=?';
        await db.query(deleteQuery, data, (err, result) => {
            console.log("Employee qualification deleted succesfully");
            res.status(httpCodes.Created).json({ message: "Employee qualification record deleted Successfully" })
        })
    } catch (err) {
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
}