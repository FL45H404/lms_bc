const httpCodes = require('../helper/httpCodes');
const db = require('../db');
const express = require("express"); 
const router = express.Router(); 

/************************************************************************************************************ 
Method Type: getLeave
Parameter list: NA
Purpose: Get all Leaves
Created By and Date: GarimaJain 20-Oct-2020
Modified By and Date:GarimaJain 13-Nov-2020
Version: V.01
************************************************************************************************************/

exports.getLeave =  (req, res) => {
    console.log('inside getleave')
    const sql = db.query('SELECT * FROM leave')
      .then(result => { 
        res.status(httpCodes.OK).json(result.rows)        
      })
      .catch(err => {
          console.log(err)
          res.status(httpCodes.NotFound).json(err)
      })
  };

/************************************************************************************************************ 
Method Type: getLeaveByLeaveId
Parameter list: leave_id
Purpose: Get Leave Detail By Id
Created By and Date: Garima Jain 24-Oct-2020
Modified By and Date:Garima Jain 13-Nov-2020
Version: V.01
************************************************************************************************************/

  exports.getLeaveByLeaveId =  (req, res) => { 
    var leaveId = req.params.leave_id;
    data=[leaveId]
    db.query('SELECT * FROM leave where leave_id=$1',data)
      .then(result => { 
        res.status(httpCodes.OK).json(result.rows)        
      })
      .catch(err => {
          console.log(err)
          res.status(httpCodes.NotFound).json(err)
      })
  };

/************************************************************************************************************
Method Name: addLeave
Parameter list: emp_name,leave_type,leave_desc,start_date,end_date,leave_count,created_date,status,emp_id
Purpose: Add leave to Leave table and send mail to manager for Approval
Created By and Date: GarimaJain 20-Oct-2020
Modified By and Date: GarimaJain 13-Nov-2020
Version: V.01
*************************************************************************************************************/

exports.addLeave =  (req, res) =>{
    var status="Pending";
    end= new Date(req.body.end_date);
    start=new Date( req.body.start_date);
     var time_difference;
     var leave_count;
     var emp_id=req.body.emp_id;
         time_difference=  end.getTime()-start.getTime();
         leave_count=time_difference/(1000 * 3600 * 24);
         console.log(leave_count);
      var data = [
      req.body.emp_name, 
      req.body.leave_type,
      req.body.leave_desc,
      req.body.start_date,
      req.body.end_date,
      leave_count,
      new Date(),
      status,
      req.body.emp_id
    ]
    db.query('INSERT INTO leave (emp_name,leave_type,leave_desc,start_date,end_date,leave_count,created_date,status,emp_id) VALUES ($1, $2, $3, $4, $5, $6, $7 ,$8, $9)',
      data)
      .then(result => {
          res.status(httpCodes.OK).json({
          message: 'Added Successfully',
          body: {
            data: { data }
          }
        })
        data2=[
          emp_id
        ]
        //Send Email to Manager for Approval
        db.query('select * from emp where emp_id=(select manager from emp where emp_id=$1)',data2)
        .then(result1 =>{
          sendEmails.sendMailer(
            result1.rows[0].email1,
            "Leave for Approval",
             "Hii " +
             req.body.emp_name+
             " applied for the leave" 
           )
        })
        .catch(err => {
          console.log(err)
          res.status(httpCodes.NotFound).json(err)
        })
      })
      .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
      })
};

/************************************************************************************************************
Method Name: updateLeaveById
Parameter list: emp_name,leave_type,leave_desc,start_date,end_date,leave_count,emp_id
Purpose: Update Leave to Leave table
Created By and Date: GarimaJain 25-Oct-2020
Modified By and Date: GarimaJain 13-Nov-2020
Version: V.01
*************************************************************************************************************/

exports.updateLeaveById =  (req, res) =>{
    var leaveId = req.params.leave_id;
    end= new Date(req.body.end_date);
        start=new Date( req.body.start_date);
         var time_difference;
         var leave_count;
             time_difference=  end.getTime()-start.getTime();
             leave_count=time_difference/(1000 * 3600 * 24);
             console.log(leave_count);
      const data = [
        req.body.emp_name, 
        req.body.leave_type,
        req.body.leave_desc,
        req.body.start_date,
        req.body.end_date,
        leave_count,
        leaveId,
        req.body.emp_id
      ]
      db.query('UPDATE leave SET emp_name=$1, leave_type = $2, leave_desc = $3, start_date = $4, end_date = $5, leave_count = $6, emp_id=$8' +
        'WHERE leave_id = $7 RETURNING *', data)
        .then(response => {
          res.status(httpCodes.OK).json({
            message: 'Updated Successfully',
            body: {
              data: { data }
            }
          })
        })
        .catch(err => {
          console.log(err)
          res.status(httpCodes.NotFound).json(err)
        })
    };

/************************************************************************************************************
Method Name: deleteLeaveById
Parameter list: leave_id
Purpose: Delete record from leave table
Created By and Date: GarimaJain 25-Oct-2020
Modified By and Date: GarimaJain 13-Nov-2020
Version: V.01
*************************************************************************************************************/

    exports.deleteLeaveById =  (req, res) =>{
        var leaveId = req.params.leave_id;
        console.log(leaveId)
          const sql = 'DELETE FROM leave WHERE leave_id = $1'
          db.query(sql, [leaveId])
          .then( result => {
            res.status(httpCodes.OK).json(result.rows)
          })
          .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
          })
      }
    
/************************************************************************************************************
Method Name: getLeaveByManagerId
Parameter list: manager_id
Purpose: Get all leave for particular Manager for approval
Created By and Date: GarimaJain 28-Oct-2020
Modified By and Date: GarimaJain 13-Nov-2020
Version: V.01
*************************************************************************************************************/


exports.getLeaveByManagerId =  (req, res) =>{
    var ManagerId = req.params.manager_id;
    Status="Pending"
    var data=[
      ManagerId,
      Status
    ]
    db.query('select * from leave where emp_id in(select emp_id from emp where manager=$1 AND status=$2)',
    data)
    .then(result => { 
      res.status(httpCodes.OK).json(result.rows)        
    })
    .catch(err => {
        res.status(httpCodes.NotFound).json(err)
    })
  };

  /************************************************************************************************************
Method Name: updateLeaveStatusByLeaveId
Parameter list: leave_id
Purpose: Update leave status by manger and after update mail is sent to particular employee
Created By and Date: GarimaJain 28-Oct-2020
Modified By and Date: GarimaJain 13-Nov-2020
Version: V.01
*************************************************************************************************************/

  exports.updateLeaveStatusByLeaveId =  (req, res) =>{
    var leaveId = req.params.leave_id;
    var Status=req.body.status;
    var data = [
      req.body.status,
      leaveId
    ]
    db.query('UPDATE leave SET status=$1 WHERE leave_id = $2 RETURNING *', data)
    .then( result => {
      res.status(httpCodes.OK).json(result.rows);
      data2=[
        leaveId
      ]
      db.query('select * from emp where emp_id=(select emp_id from leave where leave_id=$1)',data2)
      .then(result1 =>{
        sendEmails.sendMailer(
          result1.rows[0].email1,
          "Leave Status",
           "Hii " +
           result1.rows[0].emp_name+
           " your leave having leave id: "+
           leaveId+
           " is changed to "+
          Status
         )
      })
      .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
      })
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
  };