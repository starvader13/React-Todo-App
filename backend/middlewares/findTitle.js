const { Todo } = require('../db/database')

async function findTitle(req, res, next){
    const title = req.body.title;

    const response = await Todo.findOne({title: title});

    if(response){
        return res.status(409).json({
            msg: "The Todo Already Exists In Database"
        })
    }

    return next();
}

module.exports = findTitle;