import { asyncHandler } from "@/configs/handler";
import { IComunityRepo, TComunity, TGetComunity, TUpdateComunity } from "@/types/repositories/comunity";
import { prisma } from "../database";

class ComunityRepo implements IComunityRepo {
    async createComunity(data: TComunity) {
        const { data: comunity, error } = await asyncHandler(prisma.comunity.create({
            data
        }))

        if (error) {
            return null
        }
        return comunity as unknown as TComunity
    }

    async getAllComunities(data: TGetComunity) {
        
        const { data: comunities, error } = await asyncHandler(prisma.comunity.findMany({
            skip: (data.page - 1) * data.limit,
            take: data.limit,
            where: {
                title: {
                    contains: data.query,
                    mode: "insensitive"
                },

                userId: data.user || undefined
            },
            orderBy: {
                [data.sort || "createdAt"]: data.sortBy || "desc"
            },

            include:{
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true
                    }
                },

                upvotes: true,
                comments: true
            }

        }))
        if (error) {
            return null
        }
        return comunities as TComunity[]
    }

    async getComunityById(id: string) {
        const { data: comunity, error } = await asyncHandler(prisma.comunity.findUnique({
            where: {
                id
            },
            include:{
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true
                    }
                },

                upvotes: true,
                comments: {
                    include:{
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                image: true
                            }
                        }
                    }
                }
            }
        }))

        if (error) {
            return null
        }
        return comunity as TComunity
    }

    async updateComunity(data: TUpdateComunity) {
        const { data: comunity, error } = await asyncHandler(prisma.comunity.update({
            where: {
                id: data.id
            },
            data
        }))

        if (error) {
            return null
        }

        return comunity as TUpdateComunity

    }
    async deleteComunity(id: string) {
        const { error } = await asyncHandler(prisma.comunity.delete({
            where: {
                id
            }
        }))

        if (error) {
            return null
        }
        return null
    } 
}


export const comunityRepo = new ComunityRepo()