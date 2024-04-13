import { timeStamp } from "console";
import mongoose from "mongoose";

interface BlogModel{
    title:string
    cover:string
    content:string
    likes : number
}

const BlogSchema = new mongoose.Schema<BlogModel>({
  title : {type:String},
  cover : {type:String},
  content : {type:String},
  likes : {type:Number,default : 0},

   
},{timestamps:true})

const BlogModel = module.exports = mongoose.model("Blogs", BlogSchema);

export default BlogModel