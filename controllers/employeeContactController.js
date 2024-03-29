const httpCodes = require('../helper/httpCodes');
const db = require('../db');

/********************************************************************************************************************************************************************************** 
Method Type: addemployeeContacts
Parameter list: employee_category_name,created_by,created_date
Purpose: Create Employee Contact
Created By and Date: Santoshkumar 12-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************************************************************************************/ 

exports.addemployeeContacts = async (req, res) => {
    try {
        db.query("select * from employee_contacts ORDER BY created_date DESC LIMIT 1", (err, result) => {
            if (result.length > 0 && result[0].employee_contact_id != null) {
                var keyid = (result[0].employee_contact_id);
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
                id = 'ECT0000001';
            }
            var data = [id,
                req.body.employee_id,
                req.body.mobile_phone, 
                req.body.home_phone,
                req.body.alternative_contact_number,
                req.body.personal_email, 
                req.body.official_email, 
                req.body.contact_type, 
                req.body.contact_relationship, 
                req.body.contact_relation_name,
                new Date()
                ]
                var insertQuery = 'INSERT INTO employee_contacts(employee_contact_id, employee_id, mobile_phone, home_phone, alternative_contact_number, personal_email, official_email, contact_type, contact_relationship, contact_relation_name,created_date) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            db.query(insertQuery, data, (err, result) => {
                if (err) return res.send(err);
                console.log(data)
                res.status(httpCodes.Created).json({ message: "Employee Bank Details record added Successfully" })
            })

        })
    } catch (err) {
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }

}


























/************************************************************************************************************ 
Method Type: getemployeeContacts
Parameter list: NA
Purpose: Get all Employee Contact
Created By and Date: Santoshkumar 12-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/   
exports.getemployeeContacts =async(req, res) => {
    try{
        db.query('SELECT empContact.employee_id, empContact.employee_contact_id, empContact.mobile_phone, empContact.home_phone, empContact.alternative_contact_number, '
        + 'empContact.personal_email, empContact.official_email, empContact.contact_type, empContact.contact_relationship, empContact.contact_relation_name '
        + 'FROM employee_contacts empContact, employee_master empProf WHERE empContact.employee_id = empProf.employee_id',(err,result)=>{
if (err) return res.send(err);
console.log(result);
            res.status(httpCodes.OK).json(result);
        })
    }catch(err){
        res.status(httpCodes.InternalServerError).json({
            error_message: "could not get all Employee Contact",
            error: err
        })
    }
    // db.query('SELECT empContact.employee_id,empProf.employee_name, empContact.employee_contact_id, empContact.mobile_phone, empContact.home_phone, empContact.alternative_contact_number, '
    // + 'empContact.personal_email, empContact.official_email, empContact.contact_type, empContact.contact_relationship, empContact.contact_relation_name '
    // + 'FROM employee_contacts empContact, employee_master empProf WHERE empContact.employee_id = empProf.employee_id')
    // .then(allConditions => {
    //     res.status(httpCodes.OK).json(allConditions.rows);
    // }).catch(err => {
            // })
}
 /************************************************************************************************************ 
Method Type: getemployeeContactById
Parameter list: employee_contact_id
Purpose: Get Employee Contact by employee_contact_id
Created By and Date: Santoshkumar 12-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/   
exports.getemployeeContactsById = async (req, res) => {
    try{
        let employee_contactId = req.params.employee_contact_id;  
        let sql = 'SELECT empContact.employee_id, empContact.employee_contact_id, empContact.mobile_phone, empContact.home_phone, empContact.alternative_contact_number, ' 
        + 'empContact.personal_email, empContact.official_email, empContact.contact_type, empContact.contact_relationship, empContact.contact_relation_name '
        + 'FROM employee_contacts empContact, employee_master empProf WHERE empContact.employee_id = empProf.employee_id ' 	
        +' AND empContact.employee_contact_id = ?';
        db.query(sql, [employee_contactId],(err,result)=>{
            if (err) return res.send(err);
            console.log(result)
            res.status(httpCodes.OK).json(result);
        })

    }catch(err){
        console.log(err.message);
        res.status(httpCodes.InternalServerError).json(err.message);
    }

        // .then((result) => {            
        //     if (result == null) {
        //         res
        //             .status(httpCodes.BadRequest)
        //             .json({ message: "Employee Contact Id does not exists" });
        //     } else {
                
        //     }
        // })
        // .catch((err) => {
           
        // });
}
/************************************************************************************************************ 
Method Type: updateemployeeContactsById
Parameter list: employee_contact_id
Purpose: Update Employee Contact by employee_contact_id
Created By and Date: Santoshkumar 12-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/  
exports.updateemployeeContactsById = async (req,res) =>{
    try{
        var employee_contactId = req.params.employee_contact_id;
        var data=[
           req.body.employee_id,   
           req.body.mobile_phone, 
           req.body.home_phone, 
           req.body.alternative_contact_number,
           req.body.personal_email,
           req.body.official_email,
           req.body.contact_type,
           req.body.contact_relationship,
           req.body.contact_relation_name,
           employee_contactId]
       var updateQuery = 'UPDATE employee_contacts SET employee_id=?, mobile_phone=?, home_phone=?, alternative_contact_number=?, personal_email=?, official_email=?, contact_type=?,contact_relationship=?,contact_relation_name=? WHERE employee_contact_id=?';
       db.query(updateQuery, data,(err,result)=>{
           if (err) return res.send(err);
        res.status(httpCodes.Created).json({message:"Employee Contact record updated Successfully"})
       })
    }catch(err){
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
}  

exports.deleteemployeeContactsById =async (req,res) =>{
    try{
        var Id = req.params.employee_contact_id;
        var data=[
        Id]
        var deleteQuery = 'DELETE FROM employee_contacts WHERE employee_contact_id=?';
        await db.query(deleteQuery, data,(err,result)=>{
            console.log("Employee contacts deleted succesfully");
            res.status(httpCodes.Created).json({message:"Employee contacts record deleted Successfully"})
        })
    }catch(err){
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
}