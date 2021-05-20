const httpCodes = require('../helper/httpCodes');
const db = require('../db');
const express = require("express");
const router = express.Router();





//add Leave_master record 
//post method

// exports.addHolidayMaster = async (req, res) => {
//   try {
//     var created_date = new Date();
//     const data = [
//       req.body.holiday_name,
//       req.body.date,
//       req.body.comments,
//       created_date]
//     var insertQuery = 'INSERT INTO holidaymaster (holiday_name, date, comments, created_date) VALUES (?,?,?,?)';
//     console.log(data)
//     await db.query(insertQuery, data, (err, result) => {
//       console.log("Holiday record added Successfully")
//       res.status(httpCodes.Created).json({ message: "Holiday record added Successfully" })
//     })
//   } catch (err) {
//     console.log(err.message)
//     res.status(httpCodes.InternalServerError).json(err.message)

//   }

// }




exports.addHolidayMaster = async (req, res) => {
  try {
    var holidayid;
    db.query("select * from holidaymaster ORDER BY created_date DESC LIMIT 1", (err, result) => {
      if (result.length > 0 && result[0].holiday_id != null) {
        let lastId = (result[0].holiday_id);
        let id = (lastId.match(/(\d+)/));
        let intid = parseInt(id) + 1;
        holidayid = 'HOL000000' + intid;

      } else {
        holidayid = 'HOL0000001';
      }
      var data = [holidayid, req.body.holiday_name, req.body.date, req.body.comments, new Date()]
      var insertQuery = 'INSERT INTO holidaymaster(holiday_id,holiday_name,date, comments, created_date) VALUES (?,?,?,?,?)';
      db.query(insertQuery, data, (err, result) => {
        if (err) return res.send(err);
        console.log(data)
        res.status(httpCodes.Created).json({ message: "Holiday record added Successfully" })
      })

    })
  } catch (err) {
    console.log(err.message)
    res.status(httpCodes.InternalServerError).json(err.message)
  }

}


























exports.getHolidayDataByHolidayId = async (req, res) => {
  try {
    let data = [req.params.holiday_id];
    let sql = "SELECT * FROM holidaymaster where holiday_id=?";
    await db.query(sql, data, (err, result) => {
      console.log(result)
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
exports.getHolidayMaster = async (req, res) => {
  try {
    var sql = "SELECT * FROM holidaymaster";
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



exports.updateHolidayDataByHolidayId = async (req, res) => {
  try {
    var holidayId = req.params.holiday_id;
    var updated_date = new Date();
    var data = [
      req.body.holiday_name,
      req.body.date,
      req.body.comments,
      updated_date,
      holidayId]

    var updateQuery = "UPDATE holidaymaster SET holiday_name=?, date=?, comments=?, updated_date=? WHERE holiday_id=?";
    await db.query(updateQuery, data, (err, result) => {
      if (err) return res.send(err);
      res.status(httpCodes.Created).json({ message: "holiday record updated Successfully" })
    })
  } catch (err) {
    console.log(err.message)
    res.status(httpCodes.InternalServerError).json(err.message)
  }
}






//delete operation

exports.deleteHolidayById = async (req, res) => {
  try {
    var holidayId = req.params.holiday_id;
    var data = [
      holidayId]
    var deleteQuery = 'Delete FROM holidaymaster WHERE holiday_id=?';
    await db.query(deleteQuery, data, (err, result) => {
      console.log("Holiday deleted succesfully");
      res.status(httpCodes.Created).json({ message: "Holiday record deleted succesfully" })
    })

  } catch (err) {
    console.log(err.message)
    res.status(httpCodes.InternalServerError).json(err.message)
  }
}