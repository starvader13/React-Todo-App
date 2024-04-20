const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.MONGODB_URL_STRING;

mongoose.connect(connectionString).then(()=>{
    console.log("Database Connected Successfully");
}).catch(()=>{
    console.log("Database connection failed");
})

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
})

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('User', userSchema);
const Todo = mongoose.model('Todo', todoSchema);

module.exports = {
    User,
    Todo
}