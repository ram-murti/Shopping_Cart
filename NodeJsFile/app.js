const express=require('express');
const app=express();
const jwt=require('jsonwebtoken');
const dbServices=require('./mysql/dbservices').DbService;
const objService=new dbServices();
const users=require('./sampleDb/db').users;
const login=require('./sampleDb/db').login;
const amazon=require('./amazon.js').app;
const cart=require('./cart.js').cart;
const setContentHeader=require('./content/setContentHeader').setContentHeader;
const parser = require('body-parser');
app.use(parser.json());
const cors = require('cors');
app.use(cors());
app.options('*', cors());
app.get("/createDb",(req,res)=>{
      objService.createDb();
       res.end("app page");
})
app.get("/createTable",(req,res)=>{
    objService.createTable();
})

app.post("/insertData",(req,res)=>{
     setContentHeader(res);
     console.log(req.body)
     var user={
         username:req.body.username,
         email:req.body.email,
         password:req.body.password
     }
     objService.insertIntoTable(user);

})
app.post("/validateUser",(req,res)=>
{
    
    setContentHeader(res);
     var login={
         uname:req.body.uname,
         password:req.body.password
     }
    objService.selectByCondition(login,(err,result)=>{ 
         if(result!=null && result!=''){
              jwt.sign({login},'user',function(err,token){
                  var user={
                      token:token,
                      result:result
                  }
                  
                res.end(JSON.stringify(user));
              })
              
         }
     
   // })
})
    });
app.use('/products',amazon);
app.use('/carts',cart);

app.listen(3000,()=>{
    console.log("server is running on port 3000");
});