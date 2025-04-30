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
        const user = await userRepo.getUsers()

        if (user) {
            return {
                statusCode: 400,
                error: "Email already exist",
                data: {
                    user
                }
            }
        }

        //* passwpord hashing

        const hashedPassword = hashUtilities.createHash(data.password)

        // save user in database

        const newUser = await userRepo.createUser({
            name: data.name,
            email: data.email,
            password: hashedPassword
        })

        if (!newUser) {
            return {
                statusCode: 500,
                error: "Failed to create user",
                data: null
            }
        }

        // generate token
        const token = tokenUtilities.sign({ email: data.email }, myEnvironment.TOKEN, myEnvironment.TOKEN_EXPAIRY)

        // generate Otp

        const otpString = String(generateOtp(6))

        await userRepo.updateUser({
            email: data.email,
            otp: otpString,
            token: token
        })

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
            data: {
                user: null
            }
        }
    }
}

export const userService = new UserService()
