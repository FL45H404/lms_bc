//const pg = require('pg');

const mysql = require('mysql');
//console.log("hii");
//console.log(process.env.DATABASE_URL+"dburl");
// const db = new Pool({
//connectionString: 'postgres://isvfxhjtvulgxc:21c91a20eeab3d0f830a27a94393d2ba07d8d80d67304df45322e1b9266520ca@ec2-174-129-199-54.compute-1.amazonaws.com:5432/ddkmpapq4co4ko',
var db = mysql.createConnection({
user: 'hostman',
  host: 'mysql-5-b0c0.hostman.site',
  database: 'database',
  password: '2d677f0d',

ssl: {
    rejectUnauthorized: false
  }
});

// const db = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: process.env.DATABASE_URL ? true : false
// })

//client.connect();
//pg.defaults.ssl = ;
//var connection = "postgres://postgres:postgres@35.200.222.98:5432/lms-dev";
//var connection = "postgres://postgres:Garima@123@localhost:5432/postgres";
//var connection = "postgres://postgres:Garima@123@localhost:5432/hrlms";
//var connection = "postgres://postgres:p@ssw0rd@localhost:5432/HRLMS_Local";
//var connection="postgres://isvfxhjtvulgxc:21c91a20eeab3d0f830a27a94393d2ba07d8d80d67304df45322e1b9266520ca@ec2-174-129-199-54.compute-1.amazonaws.com:5432/ddkmpapq4co4ko";
//var db=new pg.Client(connection);
//var db=pg.connect();
db.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('connected to database.....')
    }

})

module.exports = db;
