import BlogModel from "../modoles/BlogModels";
import { Request,Response } from "express";
import uploader from "../cloudinary/cloudinary";
import blogCommentsModel from "../modoles/comment";
import SubscribeModule from "../modoles/subscribeModels";
import nodemailer from "nodemailer"

/****************Config The Node  Mailer*****************/
const transporter = nodemailer.createTransport({
  host:"smtp.gmail.com",
  port : 587,
  secure:false,
  auth:{
      user:"princemucyo12@gmail.com",
      pass:"ojou yfon fhoq qpkj"
  },
  tls:{
      rejectUnauthorized:false
  }
})

/*************** Creating Blog  *****************/

export const createBlog = async (req:Request, res:Response) => {
    try {
       if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      } 
      const result = await uploader(req.file,res)
      const {title,content}=req.body;    
      const blogData = new BlogModel({title,cover:result.secure_url,content});
      const savedBlog = await blogData.save();
      if(savedBlog){

 /*************** Sending Email To Those Who Subscribed To Get The Blogs  *****************/

        const subscribedEmail:any = await SubscribeModule.find()
        const emails =subscribedEmail.map((emailData:any)=> emailData.email)

        transporter.sendMail({
          from : "princemucyo12@gmail.com",
          to:emails.join(", "),
          subject: `New Blog Alert: Check Out Our Latest Post!`,
           html:`<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
           <div style="background-color: #ffffff; border-radius: 8px; padding: 20px;">
               <h1 style="color: #333333;">Hello there!</h1>
               <img src="${result.secure_url}" alt="New Blog Image" style="width: 100%; max-width: 600px; margin-top: 20px; border-radius: 8px;">
               <h2 style="color: #555555; font-size: 24px; margin-top: 20px;">New Blog Added: "${title}"</h2>
               <p style="color: #555555; font-size: 16px; margin-top: 20px;">${content}</p>
               <a href="https://prince-kid.github.io/My-BRAND-MUCYO/" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px;">Read the Blog</a>
               <p style="color: #555555; font-size: 16px; margin-top: 20px;">Happy reading!</p>
               <p style="color: #555555; font-size: 16px;">Best,</p>
               <p style="color: #333333; font-size: 18px; font-weight: bold;">Prince MUCYO</p>
           </div>
           <div style="text-align: center; margin-top: 20px;">
               <p style="color: #777777; font-size: 14px;">If you wish to unsubscribe from these emails, <a href="#" style="color: #007bff; text-decoration: none;">unsubscribe here</a>.</p>
           </div>
          </div>
         `
        })
      }
      res.status(201).json(savedBlog);
    } 
     catch (error) {
       console.log(error)
      res.status(500).json({ error: "Internal server error" });
    }
  };


/*************** Getting a Single Blog  *****************/

export const getBlog = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    try {
            const blog = await BlogModel.findById(id);
            res.status(200).json(blog);
        
    } catch (error) {
        res.status(500).json({message: error});
    }
};

/*************** Retrieving All  Blogs  *****************/

export const getAllBlogs = async (req: Request, res: Response) : Promise<void> => {
    try {
        const blogs = await BlogModel.find()
        res.status(200).send(blogs);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

/*************** Updating a Blog  *****************/

export const updateBlog = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const blogExist = await BlogModel.findOne({ _id: id });
      if (!blogExist) {
        return res.status(404).json({ message: "Blog Not found" });
      }
      let updateData = req.body; 
  
      if (req.file) {
        const result = await uploader(req.file, res);
        updateData.cover = result.secure_url;
      }
      const updateBlog = await BlogModel.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      res.status(201).json(updateBlog);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

/*************** Delete a  Blog  *****************/

  export const deleteBlog = async (req:Request, res:Response) => {
    try {
      const id = req.params.id;
      const blogExist = await BlogModel.findById({ _id: id });
      if (!blogExist) {
        return res.status(404).json({ message: "Blog not found" });
      }
      await BlogModel.findByIdAndDelete(id);
      res.status(201).json({ message: "Article deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  /*************** Creating Commenting Blog  *****************/

  export const blogComments  = async (req:Request,res:Response)=>{
    try {
      const blogId = req.params.id;
      const {names,email,comment} = req.body
      
      await blogCommentsModel.create({blogId,names,email,comment})
      res.status(200).json({message:"Comment Added Successfuly"})
      
    } catch (error) {
      res.status(500).json({message : "Internal Server Error"})
    }
   }

   /*************** View Specified Blog  *****************/

   export const viewComment = async(req:Request,res:Response)=>{
        
    const id = req.params.id
    try {
      const comment = await blogCommentsModel.find({blogId : id})
      res.status(200).send(comment)
    } catch (error) {
      res.status(500).json({message : "internal Server Error"})
    }
       

   }

   /***************************** Adding Likes & Unlike  ******************************/

   export const addLike = async (req:Request,res:Response)=>{
    try {
      const {action} = req.body

      const {id} = req.params

      const blogToLike : any = await BlogModel.findById(id)
      
      if(action === "like"){
        blogToLike.likes++
      }else{
        if(blogToLike.likes > 0){
           blogToLike.likes--
        }
      }
      await blogToLike.save()
      res.status(200).json({message : "Success"})
    } catch (error:any) {
      
      res.status(400).json({message:error.message})
    }
   }

