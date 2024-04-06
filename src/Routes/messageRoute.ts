import express from "express";
import { userMessage } from "../contollers/message";


const route = express.Router()

route.post("/message",userMessage)

const messageRoute = module.exports = route
export default messageRoute