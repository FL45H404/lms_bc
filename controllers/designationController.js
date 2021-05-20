 const httpCodes = require('../helper/httpCodes');
const db = require('../db');

/************************************************************************************************************ 
Method Type: getDesignation
Parameter list: NA
Purpose: Get all Designation names
Created By and Date: Santoshkumar 04-Nov-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/ 
exports.getDesignation = async (req, res) => {
    try{
        await db.query('SELECT * FROM designation ORDER BY designation_id DESC',(err,result)=>{
            if (err) return res.send(err);
            console.log(result)
            return res.status(httpCodes.OK).json(result);
        })
            
        }catch(err){
            res.status(httpCodes.InternalServerError).json({
                        error_message: "could not get all Designation",
                        error: err})

        }
    //     }).catch(err => {
    //     res.status(httpCodes.InternalServerError).json({
    //         error_message: "could not get all Designation",
    //         error: err
    //     })
    // })
}
/************************************************************************************************************ 
Method Type: getDesignationById
Parameter list: designation_id
Purpose: Get Designation name by designation_id
Created By and Date: Santoshkumar 4-Nov-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/ 
exports.getDesignationById = async (req, res) => {
    try{

        let data = [req.params.designation_id]; 
        let sql = "SELECT * FROM designation where designation_id=?";
        await db.query(sql, data,(err,result)=>{
            if (result==0) {
                console.log("id doesnot exists")
                res.status(httpCodes.BadRequest).json({ message: "Designation Id does not exists" });
            } else {
                console.log(result)
                res.status(httpCodes.OK).json(result);
            }
        })
            // .then((result) => {            
    }catch(err){
        console.log(err.message);
            res.status(httpCodes.InternalServerError).json(err.message);
    }
        // .catch((err) => {
        //     console.log(err.message);
        //     res.status(httpCodes.InternalServerError).json(err.message);
        // });
}
/************************************************************************************************************
Method Name: addDesignation
Parameter list: designation_name,created_by,created_date
Purpose: Add record to designation table
Created By and Date: Santoshkumar 03-Nov-2020
Modified By and Date:
Version: V.01
*************************************************************************************************************/
// exports.addDesignation =async (req,res) =>{
//     try{

//     var data=[req.body.designation_name,req.body.level, 'vipul', new Date()];
//     var insertQuery = 'INSERT INTO designation(designation_name,level ,created_by, created_date) VALUES (?,?,?,?)';
//     await db.query(insertQuery,data,(err,result)=>{
//         res.status(httpCodes.Created).json({message:"Designation record added Successfully"})
//     })
// }catch(err){
//         console.log(err.message)
//         res.status(httpCodes.InternalServerError).json(err.message)

// }
    
// }





exports.addDesignation = async (req, res) => {
    try {
      var designationid;
      db.query("select * from designation ORDER BY designation_id DESC", (err, result) => {
        if (result.length > 0 && result[0].designation_id != null) {
          let lastId = (result[0].designation_id);
          let id = (lastId.match(/(\d+)/));
          let intid = parseInt(id) + 1;
          designationid = 'DSN000000' + intid;
  
        } else {
          designationid = 'DSN0000001';
        }
        var data = [designationid, 
            req.body.designation_name,
            req.body.level, 
            req.body.created_by,
         new Date()]
         var insertQuery = 'INSERT INTO designation(designation_id, designation_name,level ,created_by, created_date) VALUES (?,?,?,?,?)';
        db.query(insertQuery, data, (err, result) => {
            if (err) return res.send(err);
          console.log(data)
          res.status(httpCodes.Created).json({ message: "Designation record added Successfully" })
        })
  
      })
    } catch (err) {
      console.log(err.message)
      res.status(httpCodes.InternalServerError).json(err.message)
    }
  
  }




/************************************************************************************************************
Method Name: updateDesignationById
Parameter list: designationId,designation_name,updated_by,updated_date
Purpose: Add record to designation table
Created By and Date: Santoshkumar 03-Nov-2020
Modified By and Date:
Version: V.01
*************************************************************************************************************/
exports.updateDesignationById = async (req,res) =>{
    try{

        var designationId = req.params.designation_id;
        var updated_date=new Date();
        var data=[
        req.body.designation_name,   
        req.body.level,
        'vipul',
        updated_date ,
        designationId]
        var updateQuery = 'UPDATE designation SET designation_name=?,level=?, updated_by=?, created_date=? WHERE designation_id=?';
        await db.query(updateQuery, data,(err,result)=>{
            if (err) return res.send(err);
            console.log("Designation record updated Successfully for id "+designationId)
            res.status(httpCodes.Created).json({message:"Designation record updated Successfully for id "+designationId})  
        })
    }catch(err){
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
    // .then(result =>{
    //     res.status(httpCodes.Created).json({message:"Designation record updated Successfully"})
    // })
    // .catch(err =>{
    //     console.log(err.message)
    //     res.status(httpCodes.InternalServerError).json(err.message)
    // })
}
exports.deleteDesignationById =async (req,res) =>{
    try{
        var Id = req.params.designation_id;
        var data=[
        Id]
        var deleteQuery = 'DELETE FROM designation WHERE designation_id=?';
        await db.query(deleteQuery, data,(err,result)=>{
            console.log("Designation deleted succesfully");
            res.status(httpCodes.Created).json({message:"Designation record deleted Successfully"})
        })
    }catch(err){
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
}
