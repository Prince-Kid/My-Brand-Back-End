import express from "express";
import mongoose from "mongoose";
import userRoute from "./Routes/User";
import blogRoute from "./Routes/BlogRoute";
import messageRoute from "./Routes/messageRoute";
import upload from "./cloudinary/multer";
import cors from "cors";
import subRoute from "./Routes/Subscribe";
import dotenv from "dotenv";
import swaggerRoute from "./Swagger/swagger";

dotenv.config();
const app = express();
const MONGO_URL: any = process.env.MONGO_URL;

/************ Connecting Mongo Db***************/

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Db Connected !!");
  })
  .catch((error) => {
    console.log(error.message);
  });
const corsOptions = {
  origin: "*",
  methods: "GET,POST,PUT,PATCH,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

/************ Routes ***************/

app.use(cors(corsOptions));
app.use(express.json());
app.use(upload.single("cover"));
app.use("/auth", userRoute);
app.use("/blog", blogRoute);
app.use("/msg", messageRoute);
app.use("/subscribe", subRoute);
app.use("/api-docs", swaggerRoute);
app.listen(5000, () => {
  console.log("server running on port 5000");
});
