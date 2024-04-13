import  express  from "express";
import { createBlog, getBlog ,getAllBlogs ,updateBlog,deleteBlog, blogComments, viewComment, addLike} from "../contollers/BlogsController";
import { verifyToken } from "../middleware/verifyToken";


const route = express.Router()

route.post("/create",verifyToken,createBlog)
route.get("/getBlog/:id",getBlog)
route.get("/all",getAllBlogs)
route.put("/update/:id",verifyToken,updateBlog)
route.delete("/delete/:id",verifyToken,deleteBlog)
route.post("/comment/:id",blogComments)
route.get("/viewcomment/:id",viewComment)
route.post("/like/:id",addLike)

const blogRoute = module.exports = route
export default blogRoute