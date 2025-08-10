const { config } = require("dotenv");
const streamifier = require("streamifier");
const cloudinary = require("cloudinary").v2;
config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

module.exports.uploadMedia = async (fileBuffer) => {
  try {
    console.log("Uploading file buffer...");
    const uploadResponse = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(fileBuffer).pipe(stream);
    });

    console.log(uploadResponse);
    return uploadResponse;

  } catch (error) {
    console.error("uploadMedia error:", error);
    throw error;
  }
};

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