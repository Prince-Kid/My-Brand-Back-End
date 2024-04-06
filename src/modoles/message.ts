import mongoose from "mongoose";

interface UserMessageModel{
    names : String,
    email : String,
    message :String
}

const messageSchema = new mongoose.Schema<UserMessageModel>({
    names : {type : String},
    email : {type : String},
    message : {type : String}
    
})

const UserMessageModel = module.exports = mongoose.model("message",messageSchema)
export default UserMessageModel