import express  from "express";
import { subscribe } from "../contollers/subscribeController";

const route = express.Router()

route.post("/subscribe",subscribe)

const subRoute = module.exports = route
export default subRoute