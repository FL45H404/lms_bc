const httpCodes = require('../helper/httpCodes');
const db = require('../db');

/*********************************************************************************************************************************************************************************************** 
Method Type: addcompanyBranch
Parameter list: company_id, branch_code, branch_address1, branch_address2, branch_address3, city, state, country, pincode, contact_no, alternative_contact_no, email, alternative_email, status, created_by, created_date
Purpose: Create Company Branch
Created By and Date: Santoshkumar 08-Dec-2020
Modified By and Date:
Version: V.01
*************************************************************************************************************************************************************************************************/
// exports.addcompanyBranch = (req,res) =>{
//     var created_date=new Date();

//     var insertQuery = 'INSERT INTO company_branch(company_id, branch_name, branch_code, branch_address1, branch_address2, branch_address3, city, state, country, pincode, contact_no, alternative_contact_no, email, '
//         +' alternative_email, status, created_by, created_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)';

//     db.query(insertQuery, [req.body.company_id, req.body.branch_name, req.body.branch_code, req.body.branch_address1, req.body.branch_address2, req.body.branch_address3, req.body.city, req.body.state, req.body.country, 
//         req.body.pincode, req.body.contact_no, req.body.alternative_contact_no, req.body.email, req.body.alternative_email, req.body.status, req.body.created_by,created_date])
//     .then(result =>{
//         res.status(httpCodes.Created).json({message:"Company Branch record added Successfully"})
//     })
//     .catch(err =>{
//         console.log(err.message)
//         res.status(httpCodes.InternalServerError).json(err.message)
//     })
// }

// exports.addcompanyBranch = (req,res) =>{
// var created_date=new Date();
// var branch_code;
// db.query('SELECT branch_code FROM company_branch ORDER BY branch_id  DESC')
//     .then((result1) => {
//     //  console.log(result1.rows[0].branch_code);
//         if (result1.rows.length > 0 && result1.rows[0].branch_code!=null ) {
//             let lastId = parseInt(result1.rows[0].branch_code);
//             branch_code=lastId+1;
//           //  console.log(branch_code);
//         } else {
//             branch_code = 1000001;
//           console.log(branch_code); 
//         }
//         var data=[             
//             req.body.company_id,
//              req.body.branch_name, 
//              branch_code, 
//              req.body.branch_address1, 
//              req.body.branch_address2, 
//              req.body.branch_address3, 
//              req.body.city, 
//              req.body.state, 
//              req.body.country, 
//             req.body.pincode, 
//             req.body.contact_no, 
//             req.body.alternative_contact_no, 
//             req.body.email, 
//             req.body.alternative_email, 
//             req.body.status, 
//             req.body.created_by,created_date ]
//                   db.query('INSERT INTO company_branch(company_id, branch_name, branch_code, branch_address1, branch_address2, branch_address3, city, state, country, pincode, contact_no, alternative_contact_no, email, '
//                          +' alternative_email, status, created_by, created_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) ', data)
//                         .then(result => {
//                         res.status(httpCodes.OK).json({
//                         message: 'Company Branch Data added Successfully',
//                         body: {
//                             data: { data }
//                         }
//                       })
//                   })
//                   .catch(err => {
//                     console.log(err)
//                     res.status(httpCodes.NotFound).json(err)
//                   })
//       })
//         .catch(err => {
//           console.log(err)
//           res.status(httpCodes.NotFound).json(err)
//         })
// }




// exports.addcompanyBranch = async (req, res) => {
//   try {
//     var created_date = new Date();
//     const data = [
//       req.body.company_id,
//       req.body.branch_name,
//       req.body.branch_code,
//       req.body.branch_address1,
//       req.body.branch_address2,
//       req.body.branch_address3,
//       req.body.city,
//       req.body.state,
//       req.body.country,
//       req.body.pincode,
//       req.body.contact_no,
//       req.body.alternative_contact_no,
//       req.body.email,
//       req.body.alternative_email,
//       req.body.status,
//       req.body.created_by,
//       created_date]
//     var insertQuery = "INSERT INTO company_branch(company_id, branch_name, branch_code, branch_address1, branch_address2, branch_address3, city, state, country, pincode, contact_no, alternative_contact_no, email, alternative_email, status, created_by, created_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
//     await db.query(insertQuery, data, (err, result) => {
//       console.log("Department record added Successfully")
//       res.status(httpCodes.Created).json({ message: "Company_branch record added Successfully" })

//     })
//   } catch (err) {
//     console.log(err.message)
//     res.status(httpCodes.InternalServerError).json(err.message)

//   }

// }





exports.addcompanyBranch = async (req, res) => {
  try {
    var branchid;
    db.query("select * from company_branch ORDER BY branch_id DESC", (err, result) => {
      if (result.length > 0 && result[0].branch_id != null) {
        let lastId = (result[0].branch_id);
        let id = (lastId.match(/(\d+)/));
        let intid = parseInt(id) + 1;
        branchid = 'BRH000000' + intid;

      } else {
        branchid = 'BRH0000001';
      }
      var data = [branchid,
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
        if (err) throw err;
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
// exports.getcompanyBranch =  (req, res) => {    
//     db.query('SELECT cmpBranch.branch_id, cmpBranch.company_id, cmpBranch.branch_name, comProf.company_name, cmpBranch.branch_code, cmpBranch.branch_address1, cmpBranch.branch_address2, cmpBranch.branch_address3,'  
//     +' cmpBranch.city,cmpBranch.state,cmpBranch.country,cmpBranch.pincode,cmpBranch.contact_no, cmpBranch.alternative_contact_no, cmpBranch.email, cmpBranch.alternative_email, cmpBranch.status '
//     +' FROM company_branch cmpBranch, company_master comProf '
//     +' WHERE cmpBranch.company_id = comProf.company_id')
//     .then(allConditions => {
//         res.status(httpCodes.OK).json(allConditions.rows);
//     }).catch(err => {
//         res.status(httpCodes.InternalServerError).json({
//             error_message: "could not get all Company Branch",
//             error: err
//         })
//     })
// }


exports.getcompanyBranch = async (req, res) => {
  try {
    var sql = "SELECT branch.branch_id,master.company_name,branch.branch_name,branch.status,branch.city FROM company_branch branch INNER JOIN company_master master ON branch.company_id =master.company_id ORDER BY branch_id DESC";
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
// exports.getcompanyBranchById = (req, res) => {
//     let branch_Id = req.params.branch_id;  
//     let sql = 'SELECT cmpBranch.branch_id, cmpBranch.company_id, cmpBranch.branch_name, comProf.company_name, cmpBranch.branch_code, cmpBranch.branch_address1, cmpBranch.branch_address2, cmpBranch.branch_address3,'  
//     +' cmpBranch.city, cmpBranch.state, cmpBranch.country, cmpBranch.pincode, cmpBranch.contact_no, cmpBranch.alternative_contact_no, cmpBranch.email, cmpBranch.alternative_email, cmpBranch.status '
//     +' FROM company_branch cmpBranch, company_master comProf '
//     +' WHERE cmpBranch.company_id = comProf.company_id '
//     +' AND cmpBranch.branch_id = $1';
//     db.query(sql, [branch_Id])
//         .then((result) => {            
//             if (result == null) {
//                 res
//                     .status(httpCodes.BadRequest)
//                     .json({ message: "Company Branch Id does not exists" });
//             } else {
//                 res.status(httpCodes.OK).json(result.rows);
//             }
//         })
//         .catch((err) => {
//             console.log(err.message);
//             res.status(httpCodes.InternalServerError).json(err.message);
//         });
// }




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
      req.body.created_by,
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







// exports.getBranchCode= (req,res)=>{
//     var branch_code;
//     db.query('SELECT branch_code FROM company_branch ORDER BY branch_code  DESC')
//         .then((result1) => {
//             if (result1.rows.length > 0 && result1.rows[0].branch_code!=null ) {
//                 let lastId = parseInt(result1.rows[0].branch_code);
//                 branch_code=lastId+1;
//                 res.status(httpCodes.OK).json(branch_code)
//             } else {
//                 branch_code = 1000001; 
//               res.status(httpCodes.OK).json(branch_code)
//             }
//           })
//           .catch(err => {
//             console.log(err)
//             res.status(httpCodes.NotFound).json(err)
//           })
//   }




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
