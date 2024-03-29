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
// exports.addemployeeBank = async (req,res) =>{
//     try{
//         var data=[ req.body.employee_id, req.body.bank_account_number, req.body.bank_ifsc, req.body.bank_upi, req.body.bank_name,
//             req.body.bank_address, req.body.bank_account_status, req.body.bank_micr_code]
//         var insertQuery = 'INSERT INTO employee_bank_details(employee_id, bank_account_number, bank_ifsc, bank_upi, bank_name,bank_address, bank_account_status, bank_micr_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
//         await db.query(insertQuery, data,(err,result)=>{
//                     if (err) return res.send(err);
//                     console.log(result)
//                     res.status(httpCodes.Created).json({message:"Employee Bank record added Successfully"})
//                 })
        
//     }catch(err){
//         console.log(err.message)
//         res.status(httpCodes.InternalServerError).json(err.message)
//     }
   
// }






exports.addemployeeBank = async (req, res) => {
    try {
        var bank_detailsid;
        db.query("select * from employee_bank_details ORDER BY created_date DESC LIMIT 1", (err, result) => {
            if (result.length > 0 && result[0].bank_details_id != null) {
                var keyid = (result[0].bank_details_id);
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
                id = 'EBD0000001';
            }
            var data = [id,
                req.body.employee_id, 
                req.body.bank_account_number, 
                req.body.bank_ifsc, 
                req.body.bank_upi, 
                req.body.bank_name,
                req.body.bank_address, 
                req.body.bank_account_status, 
                req.body.bank_micr_code,
                new Date()
                ]
                var insertQuery = 'INSERT INTO employee_bank_details(bank_details_id, employee_id, bank_account_number, bank_ifsc, bank_upi, bank_name,bank_address, bank_account_status, bank_micr_code,created_date) VALUES (?,?,?, ?, ?, ?, ?, ?, ?, ?)';
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
Method Type: getemployeeBank
Parameter list: NA
Purpose: Get all Employee Bank
Created By and Date: Santoshkumar 12-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/   
exports.getemployeeBank =  async (req, res) => {
    try{
       await db.query('SELECT empBank.employee_id, empBank.bank_details_id, empBank.bank_account_number, empBank.bank_ifsc, empBank.bank_upi, empBank.bank_name,  empBank.bank_address, empBank.bank_account_status, empBank.bank_micr_code  FROM employee_bank_details empBank, employee_master empProf WHERE empBank.employee_id = empProf.employee_id ORDER BY empBank.bank_details_id DESC ',(err,result)=>{
            if (err) return res.send(err);
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
    // + ' FROM employee_bank_details empBank, employee_master empProf WHERE empBank.employee_id = empProf.employee_id ')
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
        + ' FROM employee_bank_details empBank, employee_master empProf WHERE empBank.employee_id = empProf.employee_id ' 	
        + ' AND empBank.bank_details_id = ?';
        await db.query(sql, [bank_detailsId],(err,result)=>{
            if (err) return res.send(err);
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
    // + ' FROM employee_bank_details empBank, employee_master empProf WHERE empBank.employee_id = empProf.employee_id ' 	
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
            if (err) return res.send(err);
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
            if (err) return res.send(err);
            console.log("Employee bank details deleted succesfully");
            res.status(httpCodes.Created).json({message:"Employee bank details record deleted Successfully"})
        })
    }catch(err){
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
}