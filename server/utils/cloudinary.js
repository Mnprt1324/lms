const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

module.exports.uploadMedia=async(file)=>{
try {
      const uploadResponse=await cloudinary.uploader.upload(file,{
        resource_type:"auto",
      })
   return uploadResponse;
} catch (error) {
     console.log("uploadMedia",error);

}
} 
module.exports.deleteMediaFromCloudinary =async(publicId)=>{
try {
      await cloudinary.uploader.destroy(publicId) 
} catch (error) {
     console.log("deleteMediaFromCloudinary ",error)
}
}

module.exports.deleteVideoFromCloudinary =async(publicId)=>{
try {
      await cloudinary.uploader.destroy(publicId,{
        resource_type:"video"
      }) 
} catch (error) {
     console.log("deleteMediaFromCloudinary ",error)
}
}