const Speakeasy = require("speakeasy");
const db = require('../db');
const sendMsg = require('../helper/smsApi');
const jwt = require('jsonwebtoken');

                  

/****************************************************************************************************************************************************
Method Type: generateSecret
Parameter list: NA
Purpose: Generate Secret Key
Created By and Date: GarimaJain 11-NOV-2020
Modified By and Date:
Version: V.01
**************************************************************************************************************************************************/ 
exports.generateSecret = (request, response, next) => {
    var secret = Speakeasy.generateSecret({ length: 20 });
    request.otpSecret = secret.base32;
    next()
};

/****************************************************************************************************************************************************
Method Type: GenerateOTP
Parameter list: employee_id
Purpose: Take employee_id of active employee and Generate OTP on Registered Mobile No.
Created By and Date: GarimaJain 12-Nov-2020
Modified By and Date: Garimajain 13-Nov-2020
Version: V.01
**************************************************************************************************************************************************/ 

exports.generateOtp = (request, response) => {
    const id = request.body.id
    var isUser = false;
    var status;
    var date=new Date();
    db.query('select employee_status from employee_master where employee_id=$1',[id])
    .then(result1=>{
        if (result1.rows.length == 0 || null) {
            console.log(request.body.id + " " + "Emp Id doesnot exist");
            response.status(httpCodes.BadRequest).json({
                error_message: "Emp_id doesnot exist",
            });
        }else{
        status=result1.rows[0].employee_status;
    console.log(status);
if(status=='Active'){
    db.query('select mobile_phone from employee_contacts where employee_id=$1',
    [id])
    .then(result => { 
      if (result.rows.length == 0 || null) {
        console.log(request.body.id + " " + "Please Update your Contact Detail");
        response.status(httpCodes.BadRequest).json({
            error_message: "Update Contact Detail",
        });
    } else {
      credential=result.rows[0].mobile_phone;
  
      var patt1 = new RegExp(/[0-9]{10}/g);
      //var patt2 = new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/g);
      var phone = patt1.test(credential);
     // var email = patt2.test(credential)
      //Check if Phone OR Email 
      if(phone){
          isUser = true
      }
      else{
          response.send({
              message:"Not a valid Entry",
              success:false
          })
      }
      setTimeout(()=>{
          console.log(isUser);
          if(isUser){
              request.otp = Speakeasy.totp({
                  secret: request.otpSecret,
                  encoding: "base32",
                  digits:4,
                  window: 1,
                  step:180
              });
              db.query(`insert into otp (user_credential, otp, secret) values($1,$2,$3)`
                  ,[credential, request.otp, request.otpSecret],
                  (err,result)=>{
                      if(err){
                          console.log(err);
                      }
                      //SMS -> OTP
                      console.log(credential);
                       sendMsg.sendMessage(
                           `Your OTP is ${request.otp} `,
                           "91" + credential
                       );
                      response.json({message: "OTP sent! Please check SMS or Email for OTP",
                          secret:request.otpSecret,
                          otp:request.otp,
                          success:true,
                          phone:credential
                      });    
              })
          }
          } , 250)
    }
  })
  .catch(err => {
    console.log(err)
    response.status(httpCodes.NotFound).json(err)
  })
}
else{
    console.log("Not a active Employee")
    response.status(httpCodes.BadRequest).json({
        error_message: "Not a active Employee",
    });
} }
})
.catch(err => {
    console.log(err)
    response.status(httpCodes.NotFound).json(err)
  })
  };

  
  

/****************************************************************************************************************************************************
Method Type: ValidateOTP
Parameter list: employee_id, OTP, secret Key
Purpose: Validate that OTP is Correct or Not
Created By and Date: GarimaJain 12-NOV-2020
Modified By and Date: GarimaJain 13-Nov-2020
Version: V.01
**************************************************************************************************************************************************/ 

exports.validateOtp = (request, response, next) => {

    const otpCode= request.body.OTP;
    const id = request.body.employee_id;
    const otpSecret = request.params.secret;
    var role;
    request.validateOtp = 
            Speakeasy.totp.verify({
                secret: otpSecret,
                encoding: "base32",
                token: otpCode,
                window: 1,
                digits: 4,
                step:180
            });
  console.log(request.validateOtp);
    if(request.validateOtp){ 
        db.query('select role_description from role_master where role_id=(select role_id from employee_master where employee_id=$1)'
                  ,[id])
                  .then(result=>{
                    role=result.rows[0].role_description;  
                    let payload = {employee_id:id,role:role}
                    let token = jwt.sign(payload, '!@#123qwerty')
                    request.token = token;
                    request.success  = true;
                    next();
                  })
                  .catch(err => {
                    console.log(err)
                    response.status(httpCodes.NotFound).json(err)
                  })  
                 
  
    }else response.json({
        success:false
    })
  };

/****************************************************************************************************************************************************
Method Type: DeleteOTP
Parameter list: Secret Key
Purpose: Delete OTP
Created By and Date: GarimaJain 12-NOV-2020
Modified By and Date:
Version: V.01
**************************************************************************************************************************************************/ 

exports.deleteOtp = (req,res)=>{
    const sec = req.params.secret
//console.log("delete");
    db.query(`Delete from otp where secret = $1 returning 1`,[sec],(err,result)=>{
        if(err){
            res.json({
                success:true,
                token:req.token
            })
            throw err
        }else if(result.rows.length>1){
            res.json({
                success:true,
                token:req.token
            })
        }else{
            res.json({
                success:true,
                token:req.token
            })
        }
    })
}



exports.verifyToken = (request, response, next) => {
    const bearerHeader =request.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer =bearerHeader.split(' ');
        const bearerToken = bearer[1];
        request.token=bearerToken;
       // next();
       jwt.verify(request.token,'!@#123qwerty',(err, authData)=>{
        if(err){
         //response.status(httpCodes.Forbidden).json(err)
         console.log("Forbidden1");
        } else{
            response.json({
                messege:'Authorization Successfully',
                authData
            });
         }
        });
    }else{
       // response.status(httpCodes.Forbidden).json(err)
       console.log("forbidden2")
    }
}

