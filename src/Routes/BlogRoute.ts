import express from "express";
import {
  createBlog,
  getBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  blogComments,
  viewComment,
  addLike,
} from "../contollers/BlogsController";
import { verifyToken } from "../middleware/verifyToken";

const route = express.Router();

/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: Blog management operations
 */

/**
 * @swagger
 * blog/create:
 *
 *   post:
 *     summary: Create a new blog
 *     tags: [Blog]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - cover
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               cover:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Blog created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /blog/getBlog/{id}:
 *
 *   get:
 *     summary: Retrieve a single blog by ID
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Return the blog by ID
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /blog/all:
 *
 *   get:
 *     summary: Retrieve all blogs
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: Return all blogs
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /blog/update/{id}:
 *
 *   put:
 *     summary: Update a blog by ID
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               cover:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Blog updated successfully
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /blog/delete/{id}:
 *
 *   delete:
 *     summary: Delete a blog by ID
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /blog/comment/{id}:
 *
 *   post:
 *     summary: Add a comment to a blog
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - names
 *               - email
 *               - comment
 *             properties:
 *               names:
 *                 type: string
 *               email:
 *                 type: string
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment added successfully
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /blog/viewcomment/{id}:
 *
 *   get:
 *     summary: View comments for a specific blog
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Return comments for the blog
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /blog/like/{id}:
 *
 *   post:
 *     summary: Add a like to a blog
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [like, unlike]
 *     responses:
 *       200:
 *         description: Like added successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 */

route.post("/create", verifyToken, createBlog);
route.get("/getBlog/:id", getBlog);
route.get("/all", getAllBlogs);
route.put("/update/:id", verifyToken, updateBlog);
route.delete("/delete/:id", verifyToken, deleteBlog);
route.post("/comment/:id", blogComments);
route.get("/viewcomment/:id", viewComment);
route.post("/like/:id", addLike);

const blogRoute = (module.exports = route);
export default blogRoute;
