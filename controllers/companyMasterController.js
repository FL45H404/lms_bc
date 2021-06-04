const httpCodes = require('../helper/httpCodes');
const db = require('../db');


/***************************************************************************************************************************************************************************************** 
Method Type: getcompanyCode
Parameter list: NA
Purpose: Get Company Code
Created By and Date: Garima Jain 10/12/2020
Modified By and Date:
Version: V.01
**********************************************************************************************************************************************************************************************/   




  exports.getCompanyRegistrationNumber = async (req, res) => {
    try {
      let sql = 'select company_id,company_registration_number from company_master ORDER BY company_registration_number DESC';
      await db.query(sql,(err, result)=>{
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







/*********************************************************************************************************************************************************************************************** 
Method Type: addcompanyMaster
Parameter list: company_name, company_registration_number, company_logo, company_registered_address1, company_registered_address2, company_registered_address3, city, state, pincode, 
                country, gst_no, website, contact_no, alternative_contact_no, contact_person, tan, pan, email, alternative_email, company_type, industry, status, remarks, 
                created_by, created_date, updated_by, updated_date
Purpose: Create Company Master
Created By and Date: Santoshkumar 02-Dec-2020
Modified By and Date:
Version: V.01
*************************************************************************************************************************************************************************************************/ 



exports.addcompanyMaster = async (req, res) => {
  try {
    await db.query("select * from company_master ORDER BY created_date DESC LIMIT 1", (err, result) => {
      if (result.length > 0 && result[0].company_id != null) {
        var keyid = (result[0].company_id);
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
        id = 'CMP0000001';
      }
      var data = [id,
        req.body.company_name,
        req.body.company_registration_number,
        req.body.company_logo,
        req.body.company_registered_address1, 
        req.body.company_registered_address2,
        req.body.company_registered_address3,
        req.body.city, 
        req.body.state,
        req.body.pincode,
        req.body.country,
        req.body.gst_no,
        req.body.website,
        req.body.contact_no,
        req.body.alternative_contact_no,
        req.body.contact_person,
        req.body.tan, 
        req.body.pan,
        req.body.email,
        req.body.alternative_email, 
        req.body.company_type,
        req.body.industry,
        req.body.status,
        req.body.remarks,
        "vipul",
        new Date()]
        var insertQuery = "INSERT INTO company_master(company_id, company_name, company_registration_number, company_logo, company_registered_address1, company_registered_address2, company_registered_address3, city, state, pincode, country, gst_no, website, contact_no, alternative_contact_no, contact_person, tan, pan, email, alternative_email, company_type, industry, status, remarks, created_by, created_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      db.query(insertQuery, data, (err, result) => {
        if (err) return res.send(err);
        console.log(data)
        res.status(httpCodes.Created).json({ message: "Company record added Successfully" })
      })

    })
  } catch (err) {
    console.log(err.message)
    res.status(httpCodes.InternalServerError).json(err.message)
  }

}

/***************************************************************************************************************************************************************************************** 
Method Type: getcompanyMaster
Parameter list: NA
Purpose: Get all Company Master
Created By and Date: Santoshkumar 02-Dec-2020
Modified By and Date:
Version: V.01
**********************************************************************************************************************************************************************************************/   

exports.getcompanyMaster = async (req, res) => {
    try {
      var sql = "SELECT * FROM company_master ORDER BY created_date DESC";
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
Method Type: getcompanyMasterById
Parameter list: company_id
Purpose: Get Company Master by company_id
Created By and Date: Santoshkumar 02-Dec-2020
Modified By and Date:
Version: V.01
************************************************************************************************************************************************************************/   


exports.getcompanyMasterById = async (req, res) => {
    try {
      let data = [req.params.company_id];
      let sql = "SELECT * FROM company_master where company_id=?";
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


/************************************************************************************************************ 
Method Type: updatecompanyMasterById
Parameter list: company_id
Purpose: Update Company Master by company_id
Created By and Date: Santoshkumar 02-Dec-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/  

exports.updatecompanyMasterById = async (req,res) => {
    try{
        var companyId = req.params.company_id;
        var updated_date = new Date();
        const data = [
          req.body.company_name,
          req.body.company_registration_number,
          req.body.company_logo,
          req.body.company_registered_address1, 
          req.body.company_registered_address2,
          req.body.company_registered_address3,
          req.body.city, 
          req.body.state,
          req.body.pincode,
          req.body.country,
          req.body.gst_no,
          req.body.website,
          req.body.contact_no,
          req.body.alternative_contact_no,
          req.body.contact_person,
          req.body.tan, 
          req.body.pan,
          req.body.email,
          req.body.alternative_email, 
          req.body.company_type,
          req.body.industry,
          req.body.status,
          req.body.remarks,
          req.body.created_by,
          updated_date,
        companyId];
        var updateQuery = 'UPDATE company_master SET company_name=?, company_registration_number=?, company_logo=?,'
        +' company_registered_address1=?, company_registered_address2=?, company_registered_address3=?,'
        +' city=?, state=?, pincode=?, country=?, gst_no=?, website=?, contact_no=?, alternative_contact_no=?,'
        +' contact_person=?, tan=?, pan=?, email=?, alternative_email=?, company_type=?, industry=?, status=?,'
        +' remarks=?, created_by=?, updated_date=? WHERE company_id=?';
        await db.query(updateQuery, data ,(err,result)=>{
          console.log('Data updated succesfully')
          return res.status(httpCodes.OK).json('Data updated succesfully');
      })
  }catch(err){
      console.log(err.message)
      res.status(httpCodes.InternalServerError).json(err.message)
  }
  
}




/***************************************************************************************************************************************************************************************** 
Method Type: getcityFromCompanyMaster
Parameter list: NA
Purpose: Get distinct city names from Company Master
Created By and Date: Santoshkumar 03-Dec-2020
Modified By and Date:
Version: V.01
**********************************************************************************************************************************************************************************************/   




exports.getcompanyNames = async (req, res) => {
  try {
    //let data = [req.params.company_name];
    let sql = 'select company_id,company_name from company_master ORDER BY company_name ASC';
    await db.query(sql,(err, result)=>{
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

exports.deletecompanyById = async (req, res) => {
  try {
    var companyId = req.params.company_id;
    var data = [
      companyId]
    var deleteQuery = 'Delete FROM company_master WHERE company_id=?';
    await db.query(deleteQuery, data, (err, result) => {
      console.log("company deleted succesfully");
      res.status(httpCodes.Created).json({ message: "company record deleted succesfully" })
    })

  } catch (err) {
    console.log(err.message)
    res.status(httpCodes.InternalServerError).json(err.message)
  }
}