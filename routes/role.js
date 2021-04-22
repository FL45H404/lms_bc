var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');
const express = require("express");
var app = express();
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require('../db');
let avatarFile;
// const multer = Multer({
//   storage: Multer.MemoryStorage,
//   limits: {
//     fileSize: 1 * 1024 * 1024, // Maximum file size is 1MB
//   },
// });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use('/uploads', express.static(path.join(__dirname,'/uploads')));

const storage = multer.diskStorage({
   destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
 
  filename:  (req, file, callback) => {
    avatarFile = file.originalname;
   // let date_var= new Date().toLocaleString("en-GB",{ timeZone: "Asia/Kolkata" });
   // let date_var= new Date().toLocaleDateString();
    let date_var= new Date();    
    date_var = date_var.getDate() + '-' + (date_var.getMonth() + 1) + '-' + date_var.getFullYear()+ '_' + date_var.getHours()+ '_' + date_var.getMinutes()+ '_' +date_var.getSeconds()
    
   callback(null, avatarFile+"_" + date_var );
  }
});

const fileFilter = (req,file,callback) => {
  if(file.mimetype == 'image/jpeg'  || file.mimetype == 'image/png' ){
    callback(null,true);
  }else{
    callback(null,false);
  }
}

const upload = multer({ storage: storage, limits : {fileSize : 1000000}, fileFilter: fileFilter});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const {
  getRole,
  getRoleById,
  addRole,
  updateRoleById,
  deleteRoleById
} = require('../controllers/roleController');

router.get('/role', getRole);
router.get('/role/:role_id', getRoleById);
//router.post('/role',  addRole, upload.single('avatar'));
router.post('/role',  addRole);
router.put('/role/:role_id', updateRoleById);
router.delete('/role/:role_id',deleteRoleById); 
// router.post('/upload',  upload.single('avatar'),(req,res) =>{
//    try{ 
//      var insertQuery = 'INSERT INTO role_master(role_description, created_by, created_date, avatar) VALUES (?,?,?,?)';
//   db.query(insertQuery, [req.body.role_description,'vipul',  new Date(), avatarFile],(err,result)=>{
//   //.then(result =>{
// if (err) throw err;
//       res.status(httpCodes.Created).json({message:"Role record added Successfully"})
//   });
 
//    }
//    catch (error)
//    {
//      console.error(error);
//    }
// });

 module.exports = router;

