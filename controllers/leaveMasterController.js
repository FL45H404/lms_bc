
const httpCodes = require('../helper/httpCodes');
const db = require('../db');
const express = require("express"); 
const router = express.Router(); 



//add Leave_master record 
//post method




exports.addLeaveMaster = async (req, res) => {
  try {
    var leaveid;
    db.query("select * from leave_master ORDER BY created_date DESC LIMIT 1", (err, result) => {
      if (result.length > 0 && result[0].leave_id != null) {
        let lastId = (result[0].leave_id);
        let id = (lastId.match(/(\d+)/));
        let intid = parseInt(id) + 1;
        leaveid = 'LEV000000' + intid;

      } else {
        leaveid = 'LEV0000001';
      }
      var data = [leaveid, req.body.leave_type, req.body.number_of_leaves, req.body.year, req.body.comments, new Date()]
      var insertQuery = 'INSERT INTO leave_master(leave_id,leave_type,number_of_leaves,year, comments, created_date) VALUES (?,?,?,?,?,?)';
      db.query(insertQuery, data, (err, result) => {
        if (err) return res.send(err);
        console.log(data)
        res.status(httpCodes.Created).json({ message: "Leave record added Successfully" })
      })

    })
  } catch (err) {
    console.log(err.message)
    res.status(httpCodes.InternalServerError).json(err.message)
  }

}






















//get_by_id method

exports.getLeaveDataByLeaveId = async(req, res) => {
  try{
      let data = [req.params.leave_id];   
      let sql = "SELECT * FROM leave_master where leave_id=?";
      await db.query(sql, data,(err,result)=>{
          console.log(result)
          return res.status(httpCodes.OK).json(result)
      })
  }catch(err){
      console.log(err);
      res.status(httpCodes.InternalServerError).json({
          success:false,
          message:err.message
      })
  }
  
};







//get_all
exports.getLeaveMaster = async (req, res) => {
  try {
    var sql = "SELECT * FROM leave_master";
    await db.query(sql, (err, result) => {
      console.log(result)
      return res.status(200).json(result)
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}





//update service


exports.updateLeaveDataByLeaveId =async (req,res) =>{
  try{
    var leaveId = req.params.leave_id;
    var updated_date = new Date();
    var data = [
      req.body.leave_type,
      req.body.number_of_leaves,
      req.body.year,
      req.body.comments,
      updated_date,
      leaveId]
  
      var updateQuery = "UPDATE leave_master SET leave_type=?, number_of_leaves=?, year=?, comments=?, updated_date=? WHERE leave_id=?";
      await db.query(updateQuery, data,(err,result)=>{
          if (err) return res.send(err);
          res.status(httpCodes.Created).json({message:"Leave record updated Successfully"})
      })
  }catch(err){
      console.log(err.message)
      res.status(httpCodes.InternalServerError).json(err.message)
  }
} 





//delete operation

exports.deleteleaveById = async (req, res) => {
  try {
    var leaveId = req.params.leave_id;
    var data = [
      leaveId]
    var deleteQuery = 'Delete FROM leave_master WHERE leave_id=?';
    await db.query(deleteQuery, data, (err, result) => {
      console.log("leave deleted succesfully");
      res.status(httpCodes.Created).json({ message: "leave record deleted succesfully" })
    })

  } catch (err) {
    console.log(err.message)
    res.status(httpCodes.InternalServerError).json(err.message)
  }
}














