const httpCodes = require('../helper/httpCodes');
const db = require('../db');
const express = require("express");
const router = express.Router();




exports.addHolidayMaster = async (req, res) => {
  try {
    db.query("select * from holidaymaster ORDER BY created_date DESC LIMIT 1", (err, result) => {
      if (result.length > 0 && result[0].holiday_id != null) {
        var keyid = (result[0].holiday_id);
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
        id = 'HOL0000001';
      }
      var data = [id, req.body.holiday_name, req.body.date, req.body.comments, new Date()]
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
    var sql = "SELECT * FROM holidaymaster ORDER BY created_date DESC";
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