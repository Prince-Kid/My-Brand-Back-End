import UserMessageModel from "../modoles/message";
import { Request,Response } from "express";


/*************** Importing Messages From Clients  ***************/

export const userMessage = async (req:Request , res:Response): Promise <void> =>{
try {
const {names,email,message} = (req.body)
 
await UserMessageModel.create({names,email,message});
    res.status(200).json("Message Sent!")
 
} catch (error) {
    res.status(500).json({message:error})
}

}
/****************   View Messages   ****************/


export const viewMessages =async (req:Request , res:Response): Promise<void>=>{

    try {
        
        const messages = await UserMessageModel.find();
        res.status(200).json(messages)

    } catch (error) {
        res.status(500).json({message : "Error"})
    }
}