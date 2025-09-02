const mongoose = require('mongoose');
const {schema} = mongoose;
const bycrypt = required('bycrypt');
const userSchema = new schema({
    firstNmae:String,
    lastName:String,
    username:{type:String,required:true},
    password:{type:String,required:true}
});


userSchema.pre("save",async function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    let salt = await bycrypt.genSalt(10);
    let hash = await bycrypt.hash(user.password,salt);
    user.password = hash;
    next();
});



userSchema.methods.comparePassword = async function (password){
    return bycrypt.compare(password,this.password);
}




const User = mongoose.model("User",userSchema);


module.exports = User;