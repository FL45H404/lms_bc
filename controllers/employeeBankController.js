  const httpCodes = require('../helper/httpCodes');
const db = require('../db');

/************************************************************************************************************ 
Method Type: addemployeeBank
Parameter list: employee_id,bank_account_number,bank_ifsc,bank_upi,bank_name,bank_address,bank_account_status,bank_micr_code
Purpose: Create Employee Bank
Created By and Date: Santoshkumar 12-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/ 
exports.addemployeeBank = async (req,res) =>{
    try{
        var data=[ req.body.employee_id, req.body.bank_account_number, req.body.bank_ifsc, req.body.bank_upi, req.body.bank_name,
            req.body.bank_address, req.body.bank_account_status, req.body.bank_micr_code]
        var insertQuery = 'INSERT INTO employee_bank_details(employee_id, bank_account_number, bank_ifsc, bank_upi, bank_name,bank_address, bank_account_status, bank_micr_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        await db.query(insertQuery, data,(err,result)=>{
                    if (err) throw err;
                    console.log(result)
                    res.status(httpCodes.Created).json({message:"Employee Bank record added Successfully"})
                })
        
    }catch(err){
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
    // var insertQuery = 'INSERT INTO employee_bank_details(employee_id, bank_account_number, bank_ifsc, bank_upi, bank_name,bank_address, bank_account_status, bank_micr_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    // db.query(insertQuery, [ req.body.employee_id, req.body.bank_account_number, req.body.bank_ifsc, req.body.bank_upi, req.body.bank_name,
    //         req.body.bank_address, req.body.bank_account_status, req.body.bank_micr_code])
    // .then(result =>{
        // res.status(httpCodes.Created).json({message:"Employee Bank record added Successfully"})
    // })
    // .catch(err =>{
        // console.log(err.message)
        // res.status(httpCodes.InternalServerError).json(err.message)
    // })
}
/************************************************************************************************************ 
Method Type: getemployeeBank
Parameter list: NA
Purpose: Get all Employee Bank
Created By and Date: Santoshkumar 12-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/   
exports.getemployeeBank =  async (req, res) => {
    try{
       await db.query('SELECT empBank.employee_id, empBank.bank_details_id, empBank.bank_account_number, empBank.bank_ifsc, empBank.bank_upi, empBank.bank_name, '
        + ' empBank.bank_address, empBank.bank_account_status, empBank.bank_micr_code '
        + ' FROM employee_bank_details empBank, employee_profile empProf WHERE empBank.employee_id = empProf.employee_id ',(err,result)=>{
            if (err) throw err;
                    console.log(result)
                    res.status(httpCodes.Created).json(result)
        })
    }catch(err){
        res.status(httpCodes.InternalServerError).json({
            error_message: "could not get all Employee Bank",
            error: err
        })
    }
    // db.query('SELECT empBank.employee_id, empBank.bank_details_id, empBank.bank_account_number, empBank.bank_ifsc, empBank.bank_upi, empBank.bank_name, '
    // + ' empBank.bank_address, empBank.bank_account_status, empBank.bank_micr_code '
    // + ' FROM employee_bank_details empBank, employee_profile empProf WHERE empBank.employee_id = empProf.employee_id ')
    //  .then(allConditions => {
        // res.status(httpCodes.OK).json(allConditions.rows);
    // }).catch(err => {
        // res.status(httpCodes.InternalServerError).json({
        //     error_message: "could not get all Employee Bank",
        //     error: err
        // })
    // })
}
 /************************************************************************************************************ 
Method Type: getemployeeBankById
Parameter list: bank_details_id
Purpose: Get Employee Bank by bank_details_id
Created By and Date: Santoshkumar 12-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/   
exports.getemployeeBankById = async(req, res) => {
    try{
        let bank_detailsId = req.params.bank_details_id;  
        let sql = 'SELECT empBank.employee_id, empBank.bank_details_id, empBank.bank_account_number, empBank.bank_ifsc, empBank.bank_upi, empBank.bank_name, '
        + ' empBank.bank_address, empBank.bank_account_status, empBank.bank_micr_code '
        + ' FROM employee_bank_details empBank, employee_profile empProf WHERE empBank.employee_id = empProf.employee_id ' 	
        + ' AND empBank.bank_details_id = ?';
        await db.query(sql, [bank_detailsId],(err,result)=>{
            if (err) throw err;
            console.log(result)
            res.status(httpCodes.Created).json(result)
        })
    }catch(err){
        console.log(err.message);
        res.status(httpCodes.InternalServerError).json(err.message);

    }
}
    // let bank_detailsId = req.params.bank_details_id;  
    // let sql = 'SELECT empBank.employee_id, empBank.bank_details_id, empBank.bank_account_number, empBank.bank_ifsc, empBank.bank_upi, empBank.bank_name, '
    // + ' empBank.bank_address, empBank.bank_account_status, empBank.bank_micr_code '
    // + ' FROM employee_bank_details empBank, employee_profile empProf WHERE empBank.employee_id = empProf.employee_id ' 	
    // + ' AND empBank.bank_details_id = ?';
    // db.query(sql, [bank_detailsId])
        // .then((result) => {            
            // if (result == null) {
                // res
                    // .status(httpCodes.BadRequest)
                    // .json({ message: "Employee Bank Id does not exists" });
            // } else {
                // res.status(httpCodes.OK).json(result.rows);
        //     }
        // })
        // .catch((err) => {
        //     console.log(err.message);
        //     res.status(httpCodes.InternalServerError).json(err.message);
        // });
// }
/************************************************************************************************************ 
Method Type: updateemployeeBankById
Parameter list: bank_details_id
Purpose: Update Employee Bank by bank_details_id
Created By and Date: Santoshkumar 12-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/  
exports.updateemployeeBankById = async (req,res) =>{
    try{
        var bank_detailsId = req.params.bank_details_id;   
        var data=[
            req.body.employee_id,   
            req.body.bank_account_number, 
            req.body.bank_ifsc, 
            req.body.bank_upi,
            req.body.bank_name,
            req.body.bank_address, 
            req.body.bank_account_status,
            req.body.bank_micr_code,
            bank_detailsId]
        var updateQuery = 'UPDATE employee_bank_details SET employee_id=?, bank_account_number=?, bank_ifsc=?, bank_upi=?, bank_name=?, bank_address=?, bank_account_status=?, bank_micr_code=? WHERE bank_details_id=?';
        db.query(updateQuery, data,(err,result)=>{
            if (err) throw err;
            console.log("Employee bank details succesfully updated");
            res.status(httpCodes.Created).json({message:"Employee Bank record updated Successfully"})
        })
    }catch(err){
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
    // var bank_detailsId = req.params.bank_details_id;   
    // var data=[
    //     req.body.employee_id,   
    //     req.body.bank_account_number, 
    //     req.body.bank_ifsc, 
    //     req.body.bank_upi,
    //     req.body.bank_name,
    //     req.body.bank_address, 
    //     req.body.bank_account_status,
    //     req.body.bank_micr_code,
    //     bank_detailsId]
    // var updateQuery = 'UPDATE employee_bank_details SET employee_id=$1, bank_account_number=$2, bank_ifsc=$3, bank_upi=$4, bank_name=$5, bank_address=$6, bank_account_status=$7, bank_micr_code=$8 WHERE bank_details_id=$9 RETURNING *';
    // db.query(updateQuery, data)
    // .then(result =>{
        // res.status(httpCodes.Created).json({message:"Employee Bank record updated Successfully"})
    // })
    // .catch(err =>{
    //     console.log(err.message)
    //     res.status(httpCodes.InternalServerError).json(err.message)
    // })
}  

exports.deleteemployeeBankById =async (req,res) =>{
    try{
        var Id = req.params.bank_details_id;
        var data=[
        Id]
        var deleteQuery = 'DELETE FROM employee_bank_details WHERE bank_details_id=?';
        await db.query(deleteQuery, data,(err,result)=>{
            console.log("Employee bank details deleted succesfully");
            res.status(httpCodes.Created).json({message:"Employee bank details record deleted Successfully"})
        })
    }catch(err){
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
}