import { IcreateUser, ISingleUser, IUpateUserPassword, IUserRepo, IVerifyUser, TUser, TUserActivity } from "@/types/repositories"
import { prisma } from "../database"
import { asyncHandler } from "@/configs/handler"

class UserRepo implements IUserRepo {
    async createUser(data: IcreateUser) {
        const { data: signUp, error } = await asyncHandler(prisma.users.create({ data }))
        if (error) {
            return null
        }

        return signUp as unknown as TUser
    }
    async getSingleUser(data: ISingleUser) {
        const { data: signleUser, error } = await asyncHandler(prisma.users.findFirst({ where: { OR: [{ email: data?.email }, { id: data?.id }, { refreshToken: data?.refreshToken }] } }))

        if (error) {
            return null
        }
        return signleUser as unknown as TUser
    }
    async getUser(id:string) {
        const { data: users, error } = await asyncHandler(prisma.users.findUnique({
            where:{
                id: id
            },
            include:{
                solvedProblems: {
                    select: {
                        id: true,
                    }
                }
            }
        }))

        if (error) {
            return null
        }
        return users as unknown as TUser
    }
    async getUsers() {
        const { data: allUsers, error } = await asyncHandler(prisma.users.findMany())
        if (error) {
            return []
        }
        return allUsers as unknown as TUser[]
    }
    async updateUserPassword(data: IUpateUserPassword) {
        const { data: updateuserPass, error } = await asyncHandler(
            prisma.users.update({
                where: { email: data?.email },
                data: {
                    password: data?.password,
                    otp: data?.otp,
                    refreshToken: data?.refreshToken
                }
            })
        )

        if (error) {
            return null
        }

        return updateuserPass as unknown as TUser
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

        return verify as unknown as TUser
    }
    async updateUser(data: TUser) {
        const { data: updatedUser, error } = await asyncHandler(
            prisma.users.update({
                where: { id: data?.id },
                data: {
                    name: data?.name,
                    image: data?.image,
                    email: data?.email,
                }
            })
        )

        if (error) {
            return null
        }

        return updatedUser as unknown as TUser
    }

    async createUserActivity(data: TUserActivity) {
        const { data: userActivity, error } = await asyncHandler(
            prisma.userActivity.upsert({
                where: { userId_problemId: { userId: data.userId, problemId: data.problemsolved } },
                update: {
                    problemId: data.problemsolved,
                    problemSolvedId: data.problemsolved
                },
                create: {
                    userId: data.userId,
                    problemId: data.problemsolved,
                    problemSolvedId: data.problemsolved
                }
            })
        )

        if (error) {
            return null
        }

        return userActivity as unknown as TUser
    }

    // async getUserActivity(userId: string, problemId: string) {
    //     const { data: userActivity, error } = await asyncHandler(
    //         prisma.userActivity.findUnique({
    //             where: { userId_problemId: { userId, problemId } },
    //         })
    //     )

    //     if (error) {
    //         return null
    //     }

    //     return userActivity as unknown as TUserActivity
    // }
}

export const userRepo = new UserRepo()
