
const httpCodes = require('../helper/httpCodes');
const db = require('../db');
const express = require("express");
const router = express.Router();



//add Leave_master record 
//post method

exports.addloginMaster = async (req, res) => {
  try {
    db.query("select * from login ORDER BY created_date DESC LIMIT 1", (err, result) => {
      if (result.length > 0 && result[0].login_id != null) {
        var keyid = (result[0].login_id);
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
        id = 'LOG000001';
      }
      var created_date = new Date();
      const data = [
        id,
        req.body.user_id,
        req.body.user_name,
        req.body.password,
        req.body.role,
        created_date]
      var insertQuery = 'INSERT INTO login (login_id,user_id, user_name, password, role, created_date) VALUES (?,?,?,md5(?),?,?)';
      db.query(insertQuery, data, (err, result) => {
        console.log("Login record added Successfully")
        res.status(httpCodes.Created).json({ message: "Login record added Successfully" })
      })
    })
  } catch (err) {
    console.log(err.message)
    res.status(httpCodes.InternalServerError).json(err.message)

  }

}

//get_by_id method

exports.getloginDataByloginId = async (req, res) => {
  try {
    let data = [req.params.login_id];
    let sql = "SELECT * FROM login where login_id=?";
    await db.query(sql, data, (err, result) => {
      return res.status(httpCodes.OK).json(result)
    })
  } catch (err) {
    console.log(err);
    res.status(httpCodes.InternalServerError).json({
      success: false,
      message: err.message
    })
  }

};







//get_all
exports.getloginMaster = async (req, res) => {
  try {
    var sql = "SELECT * FROM login";
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


exports.updateloginDataByloginId = async (req, res) => {
  try {
    var loginId = req.params.login_id;
    var updated_date = new Date();
    var data = [
      req.body.user_id,
      req.body.user_name,
      req.body.password,
      req.body.role,
      updated_date,
      loginId]

    var updateQuery = "UPDATE login SET user_id=?, user_name=?, password=md5(?), role=?, updated_date=? WHERE login_id=?";
    await db.query(updateQuery, data, (err, result) => {
      if (err) return res.send(err);
      return res.status(httpCodes.Created).json({ message: "Login record updated Successfully" })
    })
  } catch (err) {
    console.log(err.message)
    res.status(httpCodes.InternalServerError).json(err.message)
  }
}

exports.auth = async (req, res) => {
  try {
    var data = [req.body.user_name,
    req.body.password];
    var sql="select * from login where user_name=?";
    db.query(sql,[req.body.user_name],(err,result)=>{
      if (err) return err;
      if (result.length>0){
        var sql="select * from login WHERE user_name=? and password=md5(?)"
        db.query(sql,data,(err,result)=>{
          if (result.length>0){
            console.log("login succesfully")
                return res.status(httpCodes.OK).json({
                  status: "success", user_id: result[0].user_id,
                  message: 'login succesfully'
                });
          }else{
            return res.status(httpCodes.NotFound).json({status:"fail",message:"invalid password"})
          }
        })

      }else{
        return res.status(httpCodes.NotFound).json({status:'fail',message:"invalid username"})
      }
    })
    // var sql = "SELECT user_id,role,user_name from login WHERE user_name=? and password=md5(?)";
    // await db.query(sql, data, (err, result) => {
    //   if (result.length > 0) {
    //     console.log("login succesfully")
    //     return res.status(httpCodes.OK).json({
    //       status: "success", user_id: result[0].user_id,
    //       message: 'login succesfully'
    //     });
    //   }
    //   else {
    //     console.log("invalid user id and password");
    //     return res.status(httpCodes.NotFound).json({ status: "fail", message: 'Invalid Id or Password' });
    //   }
    // })
  } catch (err) {
    console.log(err.message)
    res.status(httpCodes.InternalServerError).json({ message: err.message })
  }
}



//delete operation

exports.deleteloginById = async (req, res) => {
  try {
    var loginId = req.params.login_id;
    var data = [
      loginId]
    var deleteQuery = 'Delete FROM login WHERE login_id=?';
    await db.query(deleteQuery, data, (err, result) => {
      console.log("login deleted succesfully");
      return res.status(httpCodes.Created).json({ message: "login record deleted succesfully" })
    })

  } catch (err) {
    console.log(err.message)
    return res.status(httpCodes.InternalServerError).json(err.message)
  }
}












