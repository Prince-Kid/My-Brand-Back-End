import mongoose, { mongo } from "mongoose";

interface blogCommentsModel  {
blogId : string,
names : String,
email : String,
comment : String
}

const commentSchema = new mongoose.Schema<blogCommentsModel>({
blogId: {type:String},
names : {type:String},
email : {type:String},
comment : {type:String}
})

const blogCommentsModel = module.exports  = mongoose.model("comments",commentSchema)
export default blogCommentsModel