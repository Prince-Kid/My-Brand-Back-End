import express from "express";

import { userMessage, viewMessages } from "../contollers/message";


const route = express.Router()

route.post("/message",userMessage)
route.get("/feedback",viewMessages)
const messageRoute = module.exports = route
export default messageRoute