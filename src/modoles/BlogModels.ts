import mongoose from "mongoose";

interface BlogModel{
    title:String
    cover:String
    content:String
}

const BlogSchema = new mongoose.Schema<BlogModel>({
  title : {type:String},
  cover : {type:String},
  content : {type:String}

})

const BlogModel = module.exports = mongoose.model("Blogs", BlogSchema);

export default BlogModel