const cloudinary = require('cloudinary').v2
const fs = require('fs')


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const uploadOnCloudinary = async(avatarPath) => {
    const filePath= await cloudinary.uploader.upload(avatarPath, {resource_type: "auto"});
    return filePath
      }

      module.exports = uploadOnCloudinary

