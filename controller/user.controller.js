const UserMod = require('../models/authmodel.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const secret = process.env.SECRET_KEY


const signin = async(req, res)=>{
    try{
        const {email, password} = req.body
        const user = await UserMod.findOne({email: email})
        if(!user){
            return res.status(401).json({message: "Invalid email or password"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).json({message: "Invalid email or password"})
        }

        const payload = {userId: user._id}
        const admin = user.admin
        
        const token = jwt.sign(payload, secret, {expiresIn: '1h'})
        
        return    res.json({message: 'Successful login',
                            token: token,
                            admin: admin,
            
        })
                
    } catch(error){
        return  res.staus(500).json({message: "Server Error"})
    }
}

const signup = async(req, res)=>{
        try{
            if(
            !req.body.firstname ||
            !req.body.lastname ||
            !req.body.email ||
            !req.body.password
        ){
            return res.status(400).send({message: "send all required field: name, email, password"})
        }
        const {firstname, lastname, email, password} = req.body
        const salt = await bcrypt.genSalt(10);
        const harshpassword = await bcrypt.hash(password, salt);
        const user = new UserMod({
            firstname,
            lastname,
            email,
            password: harshpassword
        });
        const userRegistration = await user.save(); 
        // const userReg = await UserMod.create(req.body)
        res.status(200).json(userRegistration)

    } catch (error) {
        if( error.code === 1100 && error.keyValue.email){
            return res.status(400).json({message: "email already exist"})
        }
     return   res.staus(500).json({message: "Server Error"})

    }

}

const verifyJWT = (req, res, next)=>{
    const Token = req.headers.authorization.split(' ')[1]
    if(!Token){
        return res.status(401).json({message: "unauthorized user"})
    }
    try{
        const decode = jwt.verify(Token, secret)
        req.user = {id: decode.userId};
        next();
    }catch(error){
        res.status(401).json({message: "Invalid token"})
    }
}
module.exports = {
    signin,
    signup,
    verifyJWT
}

