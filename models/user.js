const mongoose = require('mongoose');
const {schema} = mongoose;

const userSchema = new schema({
    firstNmae:String,
    lastName:String,
    username:{type:String,required:true},
    password:{type:String,required:true}
});


const User = mongoose.model("User",userSchema);


module.exports = User;