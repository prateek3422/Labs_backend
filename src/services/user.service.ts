import { myEnvironment } from "@/configs"
import { emailverify, sendEmail } from "@/mails"
import { userRepo } from "@/repositories"
import { IcreateUser } from "@/types/repositories"
import { generateOtp } from "@/utils"
import { hashUtilities } from "@/utils/hash"
import { tokenUtilities } from "@/utils/tokenUtile"

class UserService {
    createUserService = async (data: IcreateUser) => {
        //* check if user exist or not
        const user = await userRepo.getUser()

        if (user) {
            return {
                statusCode: 400,
                error: "Email already exist",
                data: {
                    user: null
                }
            }
        }

        //* passwpord hashing

        const hashedPassword = hashUtilities.createHash(data.password)

        // generate token
        const token = tokenUtilities.sign({ email: data.email }, myEnvironment.TOKEN, myEnvironment.TOKEN_EXPAIRY)

        // generate Otp

        const otpString = String(generateOtp(6))

        // save user in database

        const newUser = await userRepo.createUser({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            otp: otpString,
            refreshToken: token
        })

        if (!newUser) {
            return {
                statusCode: 500,
                error: "Failed to create user",
                data: null
            }
        }

        // send email to verify
        await sendEmail({
            email: data.email,
            subjects: "Email verify",
            mailgentemp: emailverify({
                name: data.name,
                otp: otpString
            })
        })

        return {
            statusCode: 201,
            message: "User created successfully",
            token: token,
            data: {
                user: null
            }
        }
    }

    verifyUserService = async ({ otp, email }: { otp: string; email: string }) => {
        const user = await userRepo.getSingleUser({ email })

        if (!user) {
            return {
                statusCode: 400,
                error: "User not exist",
                data: {
                    user: null
                }
            }
        }

        if (user.otp !== otp) {
            return {
                statusCode: 400,
                error: "Invalid otp",
                data: {
                    user: null
                }
            }
        }

        const userVerify = await userRepo.verifyUser({
            email: user?.email,
            otp: "",
            isVerified: true,
            refreshToken: ""
        })

        if (!userVerify) {
            return {
                statusCode: 400,
                error: "user verification error",
                data: {
                    user: null
                }
            }
        }

        return {
            statusCode: 200,
            message: "user verified successfully",
            data: null
        }
    }

    resendEmailService = async (email: string) => {
        const user = await userRepo.getSingleUser({ email })

        if (!user) {
            return {
                statusCode: 400,
                error: "User not exist",
                data: {
                    user: null
                }
            }
        }

        // generate otp

        const newOtp = String(generateOtp(6))

        // token generator

        const token = tokenUtilities.sign({ email: email }, myEnvironment.TOKEN, myEnvironment.TOKEN_EXPAIRY)

        const updateOtp = await userRepo.verifyUser({
            otp: newOtp,
            refreshToken: token
        })

        if (!updateOtp) {
            return {
                statusCode: 400,
                error: "email resend error",
                data: {
                    user: null
                }
            }
        }
        // send email to verify
        await sendEmail({
            email: user.email,
            subjects: "Email verify",
            mailgentemp: emailverify({
                name: user.name,
                otp: newOtp
            })
        })

        return {
            statusCode: 201,
            message: "email successfully send",
            token: token,
            data: {
                user: null
            }
        }
    }

    loginUserService = async ({ email, password }: { email: string; password: string }) => {
        const user = await userRepo.getSingleUser({ email })

        if (!user) {
            return {
                statusCode: 400,
                error: "Invalid credentials",
                data: null
            }
        }

        if (!user.isVerified) {
            return {
                statusCode: 400,
                error: "user not verified",
                data: null
            }
        }
        const compairPassword = hashUtilities.compareHash(password, user.password)

        if (!compairPassword) {
            return {
                statusCode: 400,
                error: "Invalid credentials",
                data: null
            }
        }

        const AccessToken = tokenUtilities.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            myEnvironment.ACCESS_TOKEN as string,
            myEnvironment.ACCESS_TOKEN_EXPAIRY as string
        )

        const RefreshToken = tokenUtilities.sign(
            {
                id: user.id,
                email: user.email
            },
            myEnvironment.REFRESH_TOKEN as string,
            myEnvironment.REFRESH_TOKEN_EXPAIRY as string
        )

        await userRepo.verifyUser({
            email: user.email,
            refreshToken: RefreshToken
        })

        return {
            statusCode: 200,
            message: "User logged in successfully",
            data: {
                user:{
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    verified : user.isVerified
                },
                AccessToken,
                RefreshToken
            }
        }
    }

    logoutUSerService = async (email: string) => {
        const user = await userRepo.getSingleUser({email})

        if(!user){
            return {
                statusCode: 400,
                error: "user not found",
                data:null
            }
        }

        await userRepo.verifyUser({
            refreshToken :""
        })

        
        return {
            statusCode : 200,
            message : "user logout successfull",
            data: null 
        }
     
    }

    
}

export const userService = new UserService()
