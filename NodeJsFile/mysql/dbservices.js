const con=require('../mysql/mysql').con;
class DbService{
//create database
 createDb(){
con.query("CREATE DATABASE node", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });}
// create table
 createTable(){
var sql = "create TABLE cart (id INT AUTO_INCREMENT PRIMARY KEY,p_id INT, p_name VARCHAR(255), p_size VARCHAR(255),p_price VARCHAR(255),p_description VARCHAR(255),p_url VARCHAR(255),p_brand varchar(255))";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});}
// insert single value into table
 insertIntoTable(user){
const username=user.username;
const email=user.email;
const password=user.password;
console.log(username);
var records=[[username,email,password]];
var sql = "INSERT INTO user_details (username, email,password) VALUES ?";
con.query(sql,[records], function (err, result) {
  if (err) throw err;
  console.log("1 record inserted");
});}

// insert multiple value in single go
 insertMultipleVIntoTable(){
var sql = "INSERT INTO customers (name, address) VALUES ?";
var values = [
  ['John', 'Highway 71'],
  ['Peter', 'Lowstreet 4'],
  ['Amy', 'Apple st 652'],
  ['Hannah', 'Mountain 21'],
  ['Michael', 'Valley 345'],
  ['Sandy', 'Ocean blvd 2'],
  ['Betty', 'Green Grass 1'],
  ['Richard', 'Sky st 331'],
  ['Susan', 'One way 98'],
  ['Vicky', 'Yellow Garden 2'],
  ['Ben', 'Park Lane 38'],
  ['William', 'Central st 954'],
  ['Chuck', 'Main Road 989'],
  ['Viola', 'Sideway 1633']
];
con.query(sql, [values], function (err, result) {
  if (err) throw err;
  console.log("Number of records inserted: " + result.affectedRows);
});}
//select from a table
 selectAll(){
con.query("SELECT * FROM customers", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });}
  //select column with a certain condition
   selectByCondition(login,callback){
    const username=login.uname;
    const password=login.password; 
  con.query("SELECT * FROM user_details WHERE username=? and password=?",[username,password],function (err, result) {
       if(err) throw err;
    
  callback(err,result);
     
  });

}


  // delete
   deleteFromCart(val){
  var sql = "DELETE FROM cart WHERE p_id = ?";
  con.query(sql,[val],function (err, result) {
    if (err) throw err;

  });}
  //update
   updateCartQuantity(id,val){
  var sql = "UPDATE cart SET p_quantity = ? WHERE p_id = ?";
  con.query(sql,[val,id] ,function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });

}
//products
insertIntoTableProd(pro){
  const name=pro.name;
  const size=pro.size;
  const price=pro.price;
  const brand=pro.brand;
  const   url=pro.url;
  const desc=pro.desc;
  console.log(name);
  var sql = "INSERT INTO prod (p_name,p_size,p_price,p_description,p_url,p_brand) VALUES (?,?,?,?,?,?)";
  con.query(sql,[name,size,price,desc,url,brand], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });}

//select All product
selectAllProduct(callback){
  con.query("SELECT * FROM prod", function (err, result) {
callback(err,result);
console.log(result);
    });}
    selectAllCartProduct(callback){
      con.query("SELECT * FROM cart", function (err, result) {
    callback(err,result);
    console.log(result);
        });}
        insertIntoTableCart(pro){
          const quantity=pro.quantity;
          const id=pro.id;
          const name=pro.name;
          const size=pro.size;
          const price=pro.price;
          const brand=pro.brand;
          const   url=pro.url;
          const desc=pro.desc;
          console.log(name);
          var sql = "INSERT INTO cart (p_id,p_name,p_size,p_price,p_quantity,p_description,p_url,p_brand) VALUES (?,?,?,?,?,?,?,?)";
          con.query(sql,[id,name,size,price,quantity,desc,url,brand], function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
          });}
        
  }
module.exports.DbService=DbService;