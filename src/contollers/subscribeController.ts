import { Request,Response } from "express";
import nodemailer from "nodemailer"
import SubscribeModule from "../modoles/subscribeModels";


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

export const subscribe = async (req:Request , res:Response): Promise <void> =>{
try {
const {email} = (req.body)
await transporter.sendMail({
    from: "princemucyo12@gmail.com",
    to: email,
    replyTo: "princemucyo12@gmail.com",
    subject: `Welcome to My Blog Newsletter, ${email}`,
    html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="background-color: #ffffff; border-radius: 8px; padding: 20px;">
                <h1 style="color: #333333;">Hello ${email},</h1>
                <p style="color: #555555; font-size: 16px;">Welcome to the ${"Prince MUCYO's Blog"} fam!!!</p>
                <img src="https://img.freepik.com/free-photo/toy-bricks-table-with-word-my-blog_144627-47466.jpg?t=st=1713012009~exp=1713015609~hmac=496f8b0d0395cd30cb086abe8f5e09731c8fa6c832834e78377356d3cd7147f0&w=1480" alt="Welcome Image" style="width: 100%; max-width: 600px; margin-top: 20px; border-radius: 8px;">
                <p style="color: #555555; font-size: 16px; margin-top: 20px;">Thank you for subscribing to our newsletter. We promise to share insightful articles, tips, and exclusive content with you.</p>
                <p style="color: #555555; font-size: 16px;">Feel free to reply to this email with any questions, suggestions, or just to say hi! We love hearing from our community.</p>
                <a href="https://prince-kid.github.io/My-BRAND-MUCYO/" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px;">Visit Our Blog</a>
                <p style="color: #555555; font-size: 16px; margin-top: 20px;">Happy reading!</p>
                <p style="color: #555555; font-size: 16px;">Warm regards,</p>
                <p style="color: #333333; font-size: 18px; font-weight: bold;">Prince MUCYO</p>
            </div>
            
        </div>
    `
});

  res.status(200).json("Message Sent!")
  SubscribeModule.create({email})
} catch (error) {
    res.status(500).json({message:"Furebo"})
}

}