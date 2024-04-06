import UserMessageModel from "../modoles/message";
import { Request,Response } from "express";

export const userMessage = async (req:Request , res:Response): Promise <void> =>{

const message = new UserMessageModel (req.body)
try {
    await message.save();
    res.status(200).json(message)
} catch (error) {
    res.status(500).json({message:error})
}

}