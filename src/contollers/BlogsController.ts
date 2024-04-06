import BlogModel from "../modoles/BlogModels";
import { Request,Response } from "express";
import uploader from "../cloudinary/cloudinary";


export const createBlog = async (req:Request, res:Response) => {
    try {
       if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      } 
      const result = await uploader(req.file,res)
      const {title,content }=req.body;    
      const blogData = new BlogModel({ title,cover:result.secure_url ,content});
      const savedBlog = await blogData.save();
      res.status(201).json(savedBlog);
    } catch (error) {
       console.log(error)
      res.status(500).json({ error: "Internal server error" });
    }
  };



export const getBlog = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    try {
       
            const blog = await BlogModel.findById(id);
            res.status(200).json(blog);
        
    } catch (error) {
        res.status(500).json({message: error});
    }
};


export const getAllBlogs = async (req: Request, res: Response) : Promise<void> => {
    try {
        const blogs = await BlogModel.find()
        res.status(200).send(blogs);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

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