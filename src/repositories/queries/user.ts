import { IcreateUser, IUserRepo, TUser } from "@/types/repositories"
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

    async getUsers() {
        const { data: allUsers, error } = await asyncHandler(prisma.users.findMany())
        if (error) {
            return []
        }
        return allUsers as TUser[]
    }
    
}

export const userRepo = new UserRepo()
