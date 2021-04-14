const httpCodes = require('../helper/httpCodes');
const db = require('../db');
const express = require("express"); 
const router = express.Router(); 

/************************************************************************************************************ 
Method Type: getCompanyProfile
Parameter list: NA
Purpose: Get all Company names
Created By and Date: GarimaJain 31-Oct-2020
Modified By and Date:GarimaJain 13-Nov-2020
Version: V.01
************************************************************************************************************/

exports.getCompanyProfile =  (req, res) =>{
    db.query('SELECT * FROM company_profile')
      .then(result => { 
        res.status(httpCodes.OK).json(result.rows)        
      })
      .catch(err => {
          console.log(err)
          res.status(httpCodes.NotFound).json(err)
      })
  };

/************************************************************************************************************ 
Method Type: getCompanyProfileById
Parameter list: company_id
Purpose: Get Company Detail By Id
Created By and Date: Garima Jain 31-Oct-2020
Modified By and Date:Garima Jain 13-Nov-2020
Version: V.01
************************************************************************************************************/ 
  
  exports.getCompanyProfileById =  (req, res) => {
    var CompanyId = req.params.company_id;
    data=[CompanyId]
       db.query('SELECT * FROM company_profile where company_id=$1',data)
      .then(result => { 
        res.status(httpCodes.OK).json(result.rows)        
      })
      .catch(err => {
          console.log(err)
          res.status(httpCodes.NotFound).json(err)
      })
  };

/************************************************************************************************************
Method Name: addCompanyProfile
Parameter list: company_name, company_registration_number, company_registered_address, company_logo, created_by, created_date
Purpose: Add record to company_profile table
Created By and Date: GarimaJain 31-Oct-2020
Modified By and Date: GarimaJain 13-Nov-2020
Version: V.01
*************************************************************************************************************/

exports.addCompanyProfile =  (req, res) =>{
    var created_date=new Date();
    var data=[
    req.body.company_name,
    req.body.company_registration_number,
    req.body.company_registered_address,
    req.body.company_logo,
    req.body.created_by,
    created_date
  ]
              db.query('INSERT INTO company_profile(company_name, company_registration_number, company_registered_address, company_logo, created_by, created_date) VALUES ($1, $2, $3, $4, $5, $6)',
                data)
                .then(result => {
                  res.status(httpCodes.OK).json({
                  message: 'Added Successfully',
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
Method Name: updateCompanyProfileById
Parameter list: company_name, company_registration_number, company_registered_address, company_logo, updated_by, updated_date
Purpose: Update record to CompanyProfile table
Created By and Date: GarimaJain 02-Nov-2020
Modified By and Date: GarimaJain 13-Nov-2020
Version: V.01
*************************************************************************************************************/

  exports.updateCompanyProfileById =  (req, res) =>{
    var CompanyId = req.params.company_id;
    var updated_date=new Date();
    var data=[
    req.body.company_name,
    req.body.company_registration_number,
    req.body.company_registered_address, 
    req.body.company_logo,
    req.body.updated_by,
    updated_date,
    CompanyId
  ]
              db.query('UPDATE company_profile SET company_name=$1, company_registration_number=$2, company_registered_address=$3, company_logo=$4, updated_by=$5, updated_date=$6 WHERE company_id=$7 RETURNING *',
                data)
                .then(result => {
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
Method Name: deleteCompanyProfileById
Parameter list: company_id
Purpose: Delete record from company_profile
Created By and Date: GarimaJain 02-Nov-2020
Modified By and Date: GarimaJain 13-Nov-2020
Version: V.01
*************************************************************************************************************/

  exports.deleteCompanyProfileById =  (req, res) =>{
    var CompanyId = req.params.company_id;
      const sql = 'DELETE FROM company_profile WHERE company_id = $1'
      db.query(sql, [CompanyId])
      .then( result => {
        res.status(httpCodes.OK).json(result.rows)
      })
      .catch(err => {
          console.log(err)
          res.status(httpCodes.NotFound).json(err)
      })
  };
