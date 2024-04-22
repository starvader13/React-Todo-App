const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET_KEY;

function userAuthorizationCheck(req, res, next){
    const signature = req.headers.authorization;
    const token = signature.split(' ')[1];


    try{
        jwt.verify(token, secretKey);
        return next();
    }catch(e){
        return res.status(403).json({
            msg: "User Authorization Failed. Please SignIn Again"
        })
    }
}

module.exports = userAuthorizationCheck;