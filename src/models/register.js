const mongoose = require("mongoose");

const employeesschema = new mongoose.Schema({
    FullName:{
        type:String,
        required:true
        
    },
    Emailaddress:{
        type:String,
        required:true,
        unique:true
    },
    Username:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    EmployeeID:{
             type:Number,
             required:true
    }
})

//now create collection 

const Register = new mongoose.model("employees",employeesschema);
module.exports=Register;