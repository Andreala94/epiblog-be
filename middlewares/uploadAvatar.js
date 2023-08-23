const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");


cloudinary.config({ 
    cloud_name: process.env.cloudName, 
    api_key: process.env.cloudinaryKey , 
    api_secret:  process.env.cloudinaryApi
  });

  const storageAvatar = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "avatars",
        allowed_formats: ["jpg", "jpeg", "png"]
    }
  })

 const Avatar = multer({storage: storageAvatar})

 module.exports = Avatar;