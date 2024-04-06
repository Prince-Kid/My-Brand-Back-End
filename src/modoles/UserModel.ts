import mongoose from "mongoose";

interface userModel{
    username:String
    email:String
    password:String
}

const UserSchema = new mongoose.Schema<userModel>({
  username : {type:String},
  email : {type:String},
  password : {type:String}

})

const userModel = module.exports = mongoose.model("Users", UserSchema);

export default userModel