const httpCodes = require('../helper/httpCodes');
const db = require('../db');


exports.addcompanyBranch = async (req, res) => {
  try {
    db.query("select * from company_branch ORDER BY created_date DESC LIMIT 1", (err, result) => {
      if (result.length > 0 && result[0].branch_id != null) {
        var keyid = (result[0].branch_id);
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
        id = 'BRH0000001';
      }
      var data = [id,
        req.body.company_id,
        req.body.branch_name,
        req.body.branch_code,
        req.body.branch_address1,
        req.body.branch_address2,
        req.body.branch_address3,
        req.body.city,
        req.body.state,
        req.body.country,
        req.body.pincode,
        req.body.contact_no,
        req.body.alternative_contact_no,
        req.body.email,
        req.body.alternative_email,
        req.body.status,
        req.body.created_by,
        new Date()]
        var insertQuery = "INSERT INTO company_branch(branch_id, company_id, branch_name, branch_code, branch_address1, branch_address2, branch_address3, city, state, country, pincode, contact_no, alternative_contact_no, email, alternative_email, status, created_by, created_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      db.query(insertQuery, data, (err, result) => {
        if (err) return res.send(err);
        console.log(data)
        res.status(httpCodes.Created).json({ message: "Company Branch record added Successfully" })
      })

    })
  } catch (err) {
    console.log(err.message)
    res.status(httpCodes.InternalServerError).json(err.message)
  }

}


/***************************************************************************************************************************************************************************************** 
Method Type: getcompanyBranch
Parameter list: NA
Purpose: Get all Company Branch
Created By and Date: Santoshkumar 08-Dec-2020
Modified By and Date:
Version: V.01
**********************************************************************************************************************************************************************************************/


exports.getcompanyBranch = async (req, res) => {
  try {
    var sql = "SELECT branch.branch_id,master.company_name,branch.branch_name,branch.status,branch.city FROM company_branch branch INNER JOIN company_master master ON branch.company_id =master.company_id ORDER BY branch.company_id DESC";
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



/**********************************************************************************************************************************************************************
Method Type: getcompanyBranchById
Parameter list: branch_id
Purpose: Get Company Branch by branch_id
Created By and Date: Santoshkumar 13-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************************************************************************/


exports.getcompanyBranchById = async (req, res) => {
  try {
    let data = [req.params.branch_id];
    let sql = "SELECT * FROM company_branch where branch_id=?";
    await db.query(sql, data, (err, result) => {

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






/********************************************************************************************************************************** 
Method Type: updatecompanyBranchById
Parameter list: branch_id
Purpose: Update Company Branch by branch_id
Created By and Date: Santoshkumar 13-NOV-2020
Modified By and Date:
Version: V.01
**********************************************************************************************************************************/

exports.updatecompanyBranchById = async (req, res) => {
  try {
    var branchId = req.params.branch_id;
    var updated_date = new Date();
    const data = [
      req.body.company_id,
      req.body.branch_name,
      req.body.branch_code,
      req.body.branch_address1,
      req.body.branch_address2,
      req.body.branch_address3,
      req.body.city,
      req.body.state,
      req.body.country,
      req.body.pincode,
      req.body.contact_no,
      req.body.alternative_contact_no,
      req.body.email,
      req.body.alternative_email,
      req.body.status,
      "neel",
      updated_date,
      branchId];
    var updateQuery = 'UPDATE company_branch SET company_id=?, branch_name=?, branch_code=?, branch_address1=?, branch_address2=?, branch_address3=?, city=?, state=?, '
      + 'country=?, pincode=?, contact_no=?, alternative_contact_no=?, email=?, alternative_email=?, status=?, created_by=?, updated_date=? WHERE branch_id=?';
    await db.query(updateQuery, data, (err, result) => {
      console.log('Data updated succesfully')
      return res.status(httpCodes.OK).json('Data updated succesfully');
    })
  } catch (err) {
    console.log(err.message)
    res.status(httpCodes.InternalServerError).json(err.message)
  }

}


exports.getBranchCode = async (req, res) => {
  try {
    //let data = [req.params.company_name];
    let sql = 'SELECT branch_code FROM company_branch ORDER BY branch_code ASC';
    await db.query(sql, (err, result) => {
      console.log(result)
      return res.status(200).json(result)
    })

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}


//delete operation

exports.deleteBranchById = async (req, res) => {
  try {
    var branchId = req.params.branch_id;
    var data = [
      branchId]
    var deleteQuery = 'Delete FROM company_branch WHERE branch_id=?';
    await db.query(deleteQuery, data, (err, result) => {
      console.log("Company branch deleted succesfully");
      res.status(httpCodes.Created).json({ message: "Company branch record deleted succesfully" })
    })

  } catch (err) {
    console.log(err.message)
    res.status(httpCodes.InternalServerError).json(err.message)
  }
}
