 
 
 class Service{
//Generate Token
generateToken(_user){
    const _token = jwt.sign(
        _user
    ,
    UserConstants.jwt.key,{
        expiresIn : '120000ms'
    });
    return _token;
}
}










module.exports={
    SecurityService : Service
}