const { User } = require('../db/database')

async function findUser(req, res, next){
    const jsonPayload = req.body;
    req.exists = false;

    const response = await User.findOne({ email: jsonPayload.email });

    if(response){
        req.exists = true;
    }

    return next();
}

module.exports = findUser;