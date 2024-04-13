const  cloudinary = require('cloudinary');   
import dotenv from "dotenv"

dotenv.config()
const  cloud_name = process.env. cloud_name
const  api_key = process.env. api_key
const  api_secret = process.env. api_secret
cloudinary.config({ 
  cloud_name: cloud_name, 
  api_key: api_key, 
  api_secret: api_secret 
});

const uploader = async (file:any, res:any) => {
  try {
    const cover = await cloudinary.uploader.upload(file.path, {
      folder: "cover",
      use_filename: true,
    });
    return cover;
  } catch (error) {
    console.log(error)
    return res.status(400).json({
     message: error,
    });
  }
};

export default uploader