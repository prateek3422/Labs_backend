import { comunityRepo } from "@/repositories/queries/comunity";
import { TGetComunity, TUpdateComunity } from "@/types/repositories/comunity";

class ComunityService {
    async createComunity(data: {
        title: string;
        content: string;
        image?: string;
        tags: string[];
        userId: string;
    }) {

        const newComunity = await comunityRepo.createComunity({
            title: data.title,
            content: data.content,
            image: data.image || "",
            tags: data.tags,
            userId: data.userId,
            view: 0,
        });

        if (!newComunity) {
            return {
                sourceCode: 500,
                error: "error creating comunity",
            }
        }

        return {
            sourceCode: 201,
            message: "comunity created",
            data: newComunity,
        }
    }

    async getAllComunities(data: TGetComunity) {
        const comunities = await comunityRepo.getAllComunities({
            page: data.page,
            limit: data.limit,
            query: data.query,
            sort: data.sort,
            sortBy: data.sortBy,
            user: data.user
        })

        if (!comunities) {
            return {
                sourceCode: 500,
                error: "error getting comunities",
            }
        }

        return {
            sourceCode: 200,
            message: "comunities fetched",
            data: comunities,
        }

    }
    async getComunityById(data: {
        id: string
        userId: string | undefined
    }) {


        const comunity = await comunityRepo.getComunityById(data.id)
        if (!comunity) {
            return {
                sourceCode: 500,
                error: "error getting comunity",
            }
        }

        // console.log(data.userId, "userId")


        if (data?.userId && comunity) {
                comunity.view = (comunity.view ?? 0) + 1;

                await comunityRepo.updateComunity({
                    id: data.id,
                    view: comunity.view
                })
            }


        return {
            sourceCode: 200,
            message: "comunity fetched",
            data: comunity,
        }
    }

    async updateComunity(data: TUpdateComunity) {
        const updatedComunity = await comunityRepo.updateComunity({
            id: data.id,
            title: data.title,
            content: data.content,
            image: data.image,
            tags: data.tags,
        })

        if (!updatedComunity) {
            return {
                sourceCode: 500,
                error: "error updating comunity",
            }
        }

        return {
            sourceCode: 200,
            message: "comunity updated",
            data: updatedComunity,
        }
    }

    async deleteComunity(id: string) {
        const deletedComunity = await comunityRepo.deleteComunity(id)

        if (!deletedComunity) {
            return {
                sourceCode: 500,
                error: "error deleting comunity",
            }
        }

        return {
            sourceCode: 200,
            message: "comunity deleted",
            data: null,
        }
    }

    // async getComunityByUserId(id: string) {
    //     const comunities = await comunityRepo.getAllComunities({
    //         page: 1,
    //         limit: 10,
    //         user: id
    //     })

    //     if (!comunities) {
    //         return {
    //             sourceCode: 500,
    //             error: "error getting comunities",
    //         }
    //     }

    //     return {
    //         sourceCode: 200,
    //         message: "comunities fetched",
    //         data: comunities,
    //     }
    // }

}


export const comunityService = new ComunityService();