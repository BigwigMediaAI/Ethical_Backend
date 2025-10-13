// config/storage.js
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // If it's a PDF
    if (file.mimetype === "application/pdf") {
      return {
        folder: "Ethical/brochures",
        resource_type: "raw", // 👈 ensures Cloudinary treats it as a raw file
        format: "pdf",
        public_id: file.originalname.split(".")[0], // optional, for readable names
      };
    }

    // Otherwise treat as image
    return {
      folder: "Ethical/images",
      resource_type: "auto", // 👈 this ensures correct handling for images/videos
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      public_id: file.originalname.split(".")[0],
    };
  },
});

module.exports = storage;
