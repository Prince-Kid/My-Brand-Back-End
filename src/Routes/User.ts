import  express from "express";
import {register} from "../contollers/User";
import { login } from "../contollers/User";
const route = express.Router()

route.post("/register",register)
route.post("/login",login)



const userRoute = module.exports=route;

export default userRoute
