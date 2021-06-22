
const mysql = require('mysql');
//console.log("hii");
//console.log(process.env.DATABASE_URL+"dburl");
var db = mysql.createPool({
  connectionLimit:100,
  queueLimit: 100,
  user: 'mca',
  host: 'mcadb.cm47ztrqmu4p.ap-south-1.rds.amazonaws.com',
  database: 'HRLMS',
  password: 'mcafinch',
//   connectTimeout : 10000, // The milliseconds before a timeout occurs during the initial connection to the MySQL server. (Default: 10000)
//   waitForConnections: true, // Determines the pool's action when no connections are available and the limit has been reached. (Default: true)
//   acquireTimeout: 1000000, // The milliseconds before a timeout occurs during the connection acquisition. (Default: 10000)
  debug:false
});

db.getConnection((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('connected to database.....')
    }

})

module.exports = db;
