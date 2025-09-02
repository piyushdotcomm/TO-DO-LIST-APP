const User = require('../models/user');



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


const AuthController = {
    registerUser
}

module.exports = AuthController;