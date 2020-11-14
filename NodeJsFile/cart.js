var app=require('express').Router();
var Dbservices=require("./mysql/dbservices").DbService;
var dbService=new Dbservices();
const setContentHeader=require('./content/setContentHeader').setContentHeader;
const cors = require('cors');
app.use(cors());
const jwt=require('jsonwebtoken');


app.get('/getAllCartProduct',(req,res)=>{
    dbService.selectAllCartProduct((req,result)=>{
           res.end(JSON.stringify(result));
    });
})
app.post('/saveToCart',(req,res)=>{
    setContentHeader(res);
      var token=req.body.token;
      var token = token.replace(/\"/g, "");                      
     console.log(token);

      
      jwt.verify(token,'user',(err,result)=>{
          if(err){
              console.log(err);
              res.json({
                  message:"error"
              });
          }
          else{
              console.log(result);
          dbService.insertIntoTableCart(req.body);
          res.json({
              message:"suc"
          });
          }
      });
}) 
app.delete('/deleteFromCart',(req,res)=>{
    setContentHeader(res);
    dbService.deleteFromCart(req.body.id);
    res.end("here");
})
app.post('/updateCartQuantity',(req,res)=>{
    setContentHeader(res);
    dbService.updateCartQuantity(req.body.id,req.body.val);
    res.end("update");
})
module.exports.cart=app;