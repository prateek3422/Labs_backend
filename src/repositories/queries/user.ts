import { IcreateUser, ISingleUser, IUpateUser, IUserRepo, IVerifyUser, TUser } from "@/types/repositories"
import { prisma } from "../database"
import { asyncHandler } from "@/configs/handler"

class UserRepo implements IUserRepo {
    async createUser(data: IcreateUser) {
        const { data: signUp, error } = await asyncHandler(prisma.users.create({ data }))
        if (error) {
            return null
        }

        return signUp as TUser
    }

    async getSingleUser(data: ISingleUser) {
        const { data: signleUser, error } = await asyncHandler(prisma.users.findUnique({ where: { email: data.email } }))

        if (error) {
            return null
        }
        return signleUser as TUser
    }

    async getUser() {
        const { data: users, error } = await asyncHandler(prisma.users.findFirst())

        if (error) {
            return null
        }
        return users as TUser
    }

    async getUsers() {
        const { data: allUsers, error } = await asyncHandler(prisma.users.findMany())
        if (error) {
            return []
        }
        return allUsers as TUser[]
    }

    async updateUser(data: IUpateUser) {
        const { data: updateuser, error } = await asyncHandler(
            prisma.users.update({
                where: { email: data?.email },
                data
            })
        )

        if (error) {
            return null
        }

        return updateuser
    }
    async verifyUser(data: IVerifyUser): Promise<IVerifyUser | null> {
        const { data: verify, error } = await asyncHandler(
            prisma.users.update({
                where: { email: data?.email },
                data: { isVerified: data?.isVerified, refreshToken: data?.refreshToken, otp: data?.otp }
            })
        )

        if (error) {
            return null
        }

        return verify as TUser
    }
}

export const userRepo = new UserRepo()
