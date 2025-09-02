const User = require('../models/user');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

async function registerUser(req,res){
    let {firstName,lastNmae,username,password} = req.body;
    try {
        const duplicate = await User.find({username});
        if(duplicate && duplicate.length > 0){
            return res.status(400).send({message:'user allready registered with this username'});
        }
        let user = new User({firstNmae,lastName,user,password});
        const result = await user.save();
        res.status(201).send({message:'user registered successfully'});
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
        
    }
    

}

async function loginUser(req,res){
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(404).send({error:"Authentication Failed!"});
        }
        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid){
            return res.status(404).send({error:"wrong password"});
        }
        let token = jwt.sign({userId:user?._id},secretKey,{expiresIn:'1h'});
        let finalData = {
            userId:user?._id,
            username:user?.username,
            firstName:user?.firstNmae,
            lastName:user?.lastName,
            token
        }
        res.send(finalData);
    } catch (err) {
        console.log(err);
        res.status(400).send({message:err})
    }

}
const AuthController = {
    registerUser
}

module.exports = AuthController;