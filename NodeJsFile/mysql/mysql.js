const mysql = require('mysql');

const con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database:"mysql"
});
con.getConnection(function(err) {
  if (err) throw err;
  console.log("Connected!");
});



module.exports.con=con;