import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "avatarImages",
    allowed_formats: ["jpg", "png", "jpeg"],

    public_id: (req, file) => {
      const originalName = file.originalname.split(".")[0];

      return `${Date.now()}-${originalName}`;
    },
  },
});

export default storage;
export { cloudinary };