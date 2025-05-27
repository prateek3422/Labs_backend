import { logger, myEnvironment } from "@/configs";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import fs from "node:fs";

cloudinary.config({
    cloud_name: myEnvironment.CLOUDINARY_CLOUD_NAME,
    api_key: myEnvironment.CLOUDINARY_API_KEY,
    api_secret: myEnvironment.CLOUDINARY_API_SECRET,
});

// Define return types for better type safety
interface CloudinaryUploadResult {
    public_id: string;
    secure_url: string;
    url: string;
    format: string;
    width: number;
    height: number;
    bytes: number;
    resource_type: string;
}


const uploadImage = async (filePath: string): Promise<CloudinaryUploadResult | null> => {
    try {
        if (!filePath) return null;
        
        const response: UploadApiResponse = await cloudinary.uploader.upload(filePath, {
            folder: "Algo lab",
            resource_type: "auto",
        });

        // Clean up the temporary file
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return {
            public_id: response.public_id,
            secure_url: response.secure_url,
            url: response.url,
            format: response.format,
            width: response.width,
            height: response.height,
            bytes: response.bytes,
            resource_type: response.resource_type,
        };
    } catch (error) {
        if( error instanceof Error) {
            logger.error(`Cloudinary upload error: ${error.message}`);
        }
        // Clean up the temporary file even if upload fails
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        
        return null;
    }
};

const deleteImage = async (publicId: string) => {
    try {
        if (!publicId) {
            return null;
        }

         await cloudinary.uploader.destroy(publicId, {
            resource_type: "auto"
        });

        return  true
        
    } catch (error) {
        if(error instanceof Error) {
            return{
                error: error.message
            }
        }
        return null;
    }
};

export {
    uploadImage,
    deleteImage,
    type CloudinaryUploadResult,

};