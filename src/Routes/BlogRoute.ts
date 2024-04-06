import  express  from "express";
import { createBlog, getBlog ,getAllBlogs ,updateBlog,deleteBlog} from "../contollers/BlogsController";


const route = express.Router()

route.post("/create",createBlog)
route.get("/getBlog/:id",getBlog)
route.get("/all",getAllBlogs)
route.put("/update/:id",updateBlog)
route.delete("/delete/:id",deleteBlog)

const blogRoute = module.exports = route
export default blogRoute