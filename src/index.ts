
import express from "express";
import mongoose from "mongoose";
import userRoute from "./Routes/User";
import blogRoute from "./Routes/BlogRoute";
import messageRoute from "./Routes/messageRoute";
import upload from "./cloudinary/multer";
const app = express()
mongoose.connect("mongodb://localhost:27017/My-brand").then(()=>{
    console.log("Db Connected !!")
}).catch((error)=>{
    console.log(error.message);
})

app.use(express.json())
app.use(upload.single('cover'))
app.use("/auth",userRoute)
app.use("/blog",blogRoute)
app.use("/msg",messageRoute)
app.listen(5000,()=>{
    console.log("server running on port 5000")
})


