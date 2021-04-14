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
exports.getCompanyRegistrationNumber= (req,res)=>{
    var company_registration_number;
    db.query('SELECT company_registration_number FROM company_master ORDER BY company_registration_number  DESC')
        .then((result1) => {
            if (result1.rows.length > 0 && result1.rows[0].company_registration_number!=null && result1.rows[0].company_registration_number!="") {
                let lastId = parseInt(result1.rows[0].company_registration_number);
                company_registration_number=lastId+1;
                res.status(httpCodes.OK).json(company_registration_number)
            } else {
                company_registration_number = 1000001; 
              res.status(httpCodes.OK).json(company_registration_number)
            }
          })
          .catch(err => {
            console.log(err)
            res.status(httpCodes.NotFound).json(err)
          })
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
exports.addcompanyMaster = (req,res) =>{
    var insertQuery = 'INSERT INTO company_master(company_name, company_registration_number, company_logo, company_registered_address1, company_registered_address2, company_registered_address3, ' 
        +' city, state, pincode, country, gst_no, website, contact_no, alternative_contact_no, contact_person, tan, pan, email, alternative_email, company_type, industry, status, remarks, '
        +' created_by, created_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)';
    var created_date=new Date();
   
    db.query(insertQuery, [req.body.company_name,
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
        created_date])
       
    .then(result =>{
        res.status(httpCodes.Created).json({message:"Company record added Successfully"})
    })
    .catch(err =>{
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    })
}
/***************************************************************************************************************************************************************************************** 
Method Type: getcompanyMaster
Parameter list: NA
Purpose: Get all Company Master
Created By and Date: Santoshkumar 02-Dec-2020
Modified By and Date:
Version: V.01
**********************************************************************************************************************************************************************************************/   
exports.getcompanyMaster =  (req, res) => {    
    db.query('SELECT * FROM company_master').then(allConditions => {
        res.status(httpCodes.OK).json(allConditions.rows);
    }).catch(err => {
        res.status(httpCodes.InternalServerError).json({
            error_message: "could not get all Company data",
            error: err
        })
    })
}
 /**********************************************************************************************************************************************************************
Method Type: getcompanyMasterById
Parameter list: company_id
Purpose: Get Company Master by company_id
Created By and Date: Santoshkumar 02-Dec-2020
Modified By and Date:
Version: V.01
************************************************************************************************************************************************************************/   
exports.getcompanyMasterById = (req, res) => {
    let company_Id = req.params.company_id;  
    let sql = 'SELECT * FROM company_master where company_id=$1';
    db.query(sql, [company_Id])
        .then((result) => {            
            if (result == null) {
                res
                    .status(httpCodes.BadRequest)
                    .json({ message: "Company Id does not exists" });
            } else {
                res.status(httpCodes.OK).json(result.rows);
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(httpCodes.InternalServerError).json(err.message);
        });
}
/************************************************************************************************************ 
Method Type: updatecompanyMasterById
Parameter list: company_id
Purpose: Update Company Master by company_id
Created By and Date: Santoshkumar 02-Dec-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/  
exports.updatecompanyMasterById = (req,res) =>{
    var company_Id = req.params.company_id;
    var updated_date = new Date();
      var data = [
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
        req.body.updated_by,
        updated_date, 
        company_Id]

    var updateQuery = 'UPDATE company_master SET company_name=$1, company_registration_number=$2, company_logo=$3, '
                      +' company_registered_address1=$4, company_registered_address2=$5, company_registered_address3=$6,'
                      +' city=$7, state=$8, pincode=$9, country=$10, gst_no=$11, website=$12, contact_no=$13, alternative_contact_no=$14,'
                      +' contact_person=$15, tan=$16, pan=$17, email=$18, alternative_email=$19, company_type=$20, industry=$21, status=$22, '
                      +' remarks=$23, updated_by=$24, updated_date=$25 WHERE company_id=$26 RETURNING *';
    db.query(updateQuery, data)
    .then(result =>{
        res.status(httpCodes.Created).json({message:"Company record updated Successfully"})
    })
    .catch(err =>{
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    })
}  
/***************************************************************************************************************************************************************************************** 
Method Type: getcityFromCompanyMaster
Parameter list: NA
Purpose: Get distinct city names from Company Master
Created By and Date: Santoshkumar 03-Dec-2020
Modified By and Date:
Version: V.01
**********************************************************************************************************************************************************************************************/   
exports.getcityFromCompanyMaster =  (req, res) => {    
    db.query('select distinct(city) from company_master order by city').then(allConditions => {
        res.status(httpCodes.OK).json(allConditions.rows);
    }).catch(err => {
        res.status(httpCodes.InternalServerError).json({
            error_message: "could not get all city names from Company",
            error: err
        })
    })
}
/***************************************************************************************************************************************************************************************** 
Method Type: getcompanyNames
Parameter list: NA
Purpose: Get company names from Company Master
Created By and Date: Santoshkumar 08-Dec-2020
Modified By and Date:
Version: V.01
**********************************************************************************************************************************************************************************************/   
exports.getcompanyNames =  (req, res) => {    
    db.query('select company_id,company_name from company_master').then(allConditions => {
        res.status(httpCodes.OK).json(allConditions.rows);
    }).catch(err => {
        res.status(httpCodes.InternalServerError).json({
            error_message: "could not get all company names from Company",
            error: err
        })
    })
}
