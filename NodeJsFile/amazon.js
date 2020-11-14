var app=require('express').Router();
var Dbservices=require("./mysql/dbservices").DbService;
var dbService=new Dbservices();
const setContentHeader=require('./content/setContentHeader').setContentHeader;
const cors = require('cors');
app.use(cors());

app.post("/",(req,res)=>{
    
    setContentHeader(res);
   
    var pro={
        name:req.body.name,
        size:req.body.size,
        price:req.body.price,
        desc:req.body.desc,
        brand:req.body.brand,
        url:req.body.url
    }
    dbService.insertIntoTableProd(pro);
    res.end("product page");
});
app.get('/getAll',(req,res)=>{
    dbService.selectAllProduct((req,result)=>{
        console.log(result);
           res.end(JSON.stringify(result));
    });
    
})
module.exports.app=app;