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
// exports.getCompanyRegistrationNumber= (req,res)=>{
//     var company_registration_number;
//     db.query('SELECT company_registration_number FROM company_master ORDER BY company_registration_number  DESC')
//         .then((result1) => {
//             if (result1.rows.length > 0 && result1.rows[0].company_registration_number!=null && result1.rows[0].company_registration_number!="") {
//                 let lastId = parseInt(result1.rows[0].company_registration_number);
//                 company_registration_number=lastId+1;
//                 res.status(httpCodes.OK).json(company_registration_number)
//             } else {
//                 company_registration_number = 1000001; 
//               res.status(httpCodes.OK).json(company_registration_number)
//             }
//           })
//           .catch(err => {
//             console.log(err)
//             res.status(httpCodes.NotFound).json(err)
//           })
//   }





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
    var companyid;
    await db.query("select * from company_master ORDER BY company_id DESC", (err, result) => {
      if (result.length > 0 && result[0].company_id != null) {
        let lastId = (result[0].company_id);
        let id = (lastId.match(/(\d+)/));
        let intid = parseInt(id) + 1;
        companyid = 'CMP000000' + intid;

      } else {
        companyid = 'CMP0000001';
      }
      var data = [companyid,
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
      var sql = "SELECT * FROM company_master";
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
// exports.getcityFromCompanyMaster =  (req, res) => {    
//     db.query('select distinct(city) from company_master order by city').then(allConditions => {
//         res.status(httpCodes.OK).json(allConditions.rows);
//     }).catch(err => {
//         res.status(httpCodes.InternalServerError).json({
//             error_message: "could not get all city names from Company",
//             error: err
//         })
//     })
// }





// exports.getcityFromCompanyMaster = async (req, res) => {
//   try {
//     //let data = [req.params.company_name];
//     let sql = 'select distinct(city) from company_master order by city';
//     //let sql = 'select company_id,company_name from company_master ORDER BY company_name ASC';
//     await db.query(sql,(err, result)=>{
//       console.log(result)
//           return res.status(200).json(result)
//         })

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       message: err.message
//     })
//   }
// }










/***************************************************************************************************************************************************************************************** 
Method Type: getcompanyNames
Parameter list: NA
Purpose: Get company names from Company Master
Created By and Date: Santoshkumar 08-Dec-2020
Modified By and Date:
Version: V.01
**********************************************************************************************************************************************************************************************/   
// exports.getcompanyNames =  (req, res) => {    
//     db.query('select company_id,company_name from company_master').then(allConditions => {
//         res.status(httpCodes.OK).json(allConditions.rows);
//     }).catch(err => {
//         res.status(httpCodes.InternalServerError).json({
//             error_message: "could not get all company names from Company",
//             error: err
//         })
//     })
// }





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