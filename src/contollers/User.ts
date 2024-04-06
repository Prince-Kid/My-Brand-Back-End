import { Request ,Response} from "express";
import userModel from "../modoles/UserModel";
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken";


export const register = async(req:Request,res:Response)=>{

    const {username,email,password} = req.body;
try {
    if(username !== "" && email !== "" && password !== ""){
        const hashedPassword = bcrypt.hashSync(password,10)
        
        const InsertData = await userModel.create({username, email, password:hashedPassword});
        if(InsertData){
            const token = jwt.sign({data:InsertData}, "prince12", {expiresIn:"3h"})  //token expire in 3 hours
            
         res.json({message:"Register Successfully",token:token})
        }
    }else{
        res.json({message : "Please Fill The Fields"})
    }
  
} catch (error:any) {
    console.log(error.message)
}
}

export const login = async (req:Request , res:Response)=>{
   
    try {
        const {email,password} = req.body
        const existUser = await userModel.findOne({email:email})
        if(existUser){
        const comparePassword = bcrypt.compareSync(password,existUser.password.toString())
        if(comparePassword){
            const token = jwt.sign({data:existUser}, "prince12", {expiresIn:"3h"})
            res.json({message:"login Success",token:token})
        }else{
            res.json({message:"Invalid Email Or Password"})
        }
        }else{
            res.json({message:"nvalid Email Or Password"})
        }
    } catch (error:any) {
        console.log(error.message)
    }
}

