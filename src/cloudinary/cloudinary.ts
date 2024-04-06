const  cloudinary = require('cloudinary');       
cloudinary.config({ 
  cloud_name: 'dvhfu2a0u', 
  api_key: '783233464721532', 
  api_secret: 'FMTF5AKPFFPlL8re23Ly0yydF0I' 
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