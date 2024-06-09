const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {

    firstname: String,
    lastname: String,
    email: String,
    password: String,
       
    
}

)

const UserMod = mongoose.model('login', userSchema)
module.exports = UserMod;
