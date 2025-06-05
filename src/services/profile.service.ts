import { userRepo } from "@/repositories";
// import { problemRepo } from "@/repositories/queries/problem";
import { deleteImage, uploadImage } from "@/utils";

// Define proper types for file uploads
interface FileUpload {
    image?: Express.Multer.File[];
}

interface ProfilePictureData {
    files: FileUpload;
    userId: string;
}

class ProfileService {
    async uploadProfilePicture(data: ProfilePictureData) {
        const user = await userRepo.getSingleUser({ id: data.userId });

        if (!user) {
            return {
                statusCode: 404,
                error: "User not found"
            };
        }

        // Check if user has existing image and delete it
        if (user.image?.publicId && user.image.publicId !== "") {
            await deleteImage(user.image.publicId);
        }

        // Properly type and validate the file upload
        const imageFiles = data.files.image;
        if (!imageFiles || !Array.isArray(imageFiles) || imageFiles.length === 0) {
            return {
                statusCode: 400,
                error: "Image file is required"
            };
        }

        const localFilePath = imageFiles[0]?.path;
        if (!localFilePath) {
            return {
                statusCode: 400,
                error: "Image file path is invalid"
            };
        }

        const uploadAvatar = await uploadImage(localFilePath);

        if (!uploadAvatar) {
            return {
                statusCode: 500,
                error: "Failed to upload image"
            };
        }

        const updatedUser = await userRepo.updateUser({
            id: data.userId,
            image: {
                publicId: uploadAvatar.public_id,
                url: uploadAvatar.secure_url
            },
            name: user.name,
            email: user.email,
            role: user.role,
            refreshToken: user.refreshToken,
            otp: "",
            password: "",
            isVerified: user.isVerified,
        });

        if (!updatedUser) {
            return {
                statusCode: 500,
                error: "Failed to update user profile"
            };
        }

        return {
            statusCode: 200,
            message: "Profile picture updated successfully",
            data: {
                image: updatedUser.image
            }
        };
    }

    // async createUserActivity(userId: string) {
    //     const user = await userRepo.getUser(userId);

    //     const problemsolvedId = await problemRepo.getAllProblemsSolvedByUser(userId);

    //     if (!problemsolvedId) {
    //         return {
    //             statusCode: 404,
    //             error: "No problems solved by user"
    //         };
    //     }

    //     if (!user) {
    //         return {
    //             statusCode: 404,
    //             error: "User not found"
    //         };
    //     }



    //     const date = new Date();
    //     // const currentDate = date.toISOString().split('T')[0]; // Format date to YYYY-MM-DD

    //     // const userActivity = await userRepo.createUserActivity({
    //     //     userId: user.id,
    //     //     problemsolvedId: problemsolvedId.map(problem => problem.id)
    //     // });

    //     // if (!userActivity) {
    //     //     return {
    //     //         statusCode: 500,
    //     //         error: "Failed to create user activity"
    //     //     };
    //     // }
    //     // return {
    //     //     statusCode: 201,
    //     //     message: "User activity created successfully",
    //     //     data: userActivity
    //     // };

    // }
}

export const profileService = new ProfileService();