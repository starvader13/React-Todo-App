const express = require('express');
const cors = require('cors');
const { route } = require('./routes/server');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors())

app.use(express.json());

app.use("/api", route);

app.get("/*", async (req, res)=>{
    res.status(404).json({
        msg: "Route not defined"
    })
})

app.listen(port, ()=>{
    console.log(`Server is listening at PORT ${port}`);
})