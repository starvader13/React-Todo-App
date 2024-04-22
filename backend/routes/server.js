const { Router } = require('express');
const signSchemaAuthenticationCheck = require('../middlewares/signAuthentication');
const findUser = require('../middlewares/findUser');
const { User, Todo } = require('../db/database');
const userAuthorizationCheck = require('../middlewares/userAuthorization');
const todoSchemaAuthenticationCheck = require('../middlewares/todoAuthentications');
const findTitle = require('../middlewares/findTitle');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET_KEY;
const route = Router();

route.post("/signup", signSchemaAuthenticationCheck, findUser, async (req, res)=>{
    const jsonUserData = req.body;

    if(req.exists){
        return res.status(401).json({
            msg: "The email is already registered. Please Sign-In"
        })
    }

    const user = await User.create(jsonUserData);

    if(!user){
        return res.status(500).json({
            msg: "Internal Server Error In Adding To Database"
        })
    }

    return res.status(200).json({
        msg: "SignUp Successful. Please SignIn"
    })
})

route.post("/signin", signSchemaAuthenticationCheck, findUser, async (req, res)=>{
    const jsonUserData = req.body;

    if(!req.exists){
        return res.status(401).json({
            msg: "The email is not registered. Please Sign-Up"
        })
    }

    const signature = jwt.sign({ email: jsonUserData.email}, secretKey);
    const token = "Bearer " + signature;

    return res.status(200).json({
        msg: "User signedIn successfully",
        token: token
    });
})

route.post("/todo", todoSchemaAuthenticationCheck, userAuthorizationCheck, findTitle, async (req, res)=>{
    const jsonTodoData = req.body;

    const todo = await Todo.create(jsonTodoData);

    if(!todo){
        return res.status(500).json({
            msg: "Internal Server Error In Adding To Database"
        });
    }

    return res.status(200).json({
        msg: "Successfully added todo to the database"
    });
})

route.get("/todo", userAuthorizationCheck, async (req, res)=>{
    const todos = await Todo.find({});

    if(!todos){
        return res.status(404).json({
            msg: "Todo does not exist"
        })
    }

    return res.status(200).json(todos);
})

route.post("/completed/:id", userAuthorizationCheck, async (req, res)=>{
    const todoId = req.params.id;

    const response = await Todo.findOneAndUpdate({
        _id: todoId
    },{completed: true});

    if(!response){
        return res.status(500).json({
            msg: "Internal Server Error. Mark As Done Failed"
        });
    }

    return res.status(200).json({
        msg: "Marked As Done Successfully"
    });
})

route.use((err, req, res, next)=>{
    return res.status(500).json({
        msg: "Internal Server Error"
    })
})

module.exports = {
    route
}