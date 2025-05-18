import { asyncHandler } from "@/configs/handler";
import { IPlaylistRepo, TPlaylist, TPlaylistId, TuserID } from "@/types/repositories/playlist";
import { prisma } from "../database";

class PlaylistRepo implements IPlaylistRepo {
    async createPlaylist(data: TPlaylist) {
        const { data: playlist, error } = await asyncHandler(prisma.playlist.create({ data }))
        if (error) {
            return null
        }
        return playlist as TPlaylist
    }

    async getAllPlaylists(data: TuserID) {
        const { data: playlists, error } = await asyncHandler(prisma.playlist.findMany({
            where: {
                userId: data.userId
            },
            include: {
                problems: {
                    include: {
                        problem: true
                    }
                }
            }
        }))
        if (error) {
            return null
        }
        return playlists as TPlaylist[]
    }

    async getPlaylistDetails(playlistId: string) {
        const { data: playlistm, error } = await asyncHandler(prisma.playlist.findUnique({
            where: {
                id: playlistId
            }
            , include: {
                problems: {
                    include: {
                        problem: true
                    }
                }
            }
        }))

        if (error) {
            return null
        }

        return playlistm as TPlaylist


    }

    async deletePlaylist(playlistId: string) {
        const {data:playlist,error} = await asyncHandler(prisma.playlist.delete({
            where:{
                id: playlistId
            }
        }))
        if (error) {
            return null
        }

        return playlist as TPlaylist
    }

    async addProblemToPlaylist(data: TPlaylistId) {
        const { data: playlist, error } = await asyncHandler(prisma.problemInPlaylist.createMany({
            data: data.problemId.map((id) => ({
                problemId: id,
                playlistId: data?.playlistId
            }))
        }))
        if (error) {
            return null
        }
        return playlist as unknown as TPlaylist[]
    }

    async removeProblemFromPlaylist(data: TPlaylistId) {
        const { data: playlist, error } = await asyncHandler(prisma.problemInPlaylist.deleteMany({

            where:{
                playlistId: data.playlistId,
                problemId:{
                    in: data.problemId
                }
            }

        }))
        if (error) {
            return null
        }
        return playlist as unknown as TPlaylist[]
    }
}

export const playlistRepo = new PlaylistRepo();