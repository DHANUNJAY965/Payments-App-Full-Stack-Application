
const mongoose = require('mongoose');
require("dotenv").config();

const connect= () =>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>{ console.log("db connected succesfully ")})
    .catch((e)=>
    {
        console("error connecting "+e);
    })
}
module.exports = connect;