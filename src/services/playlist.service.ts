import { playlistRepo } from "@/repositories/queries/playlist";
import { TPlaylist } from "@/types/repositories/playlist";

class PlaylistService {
    async getAllPlaylists(userId: string) {
        const playlists = await playlistRepo.getAllPlaylists({ userId });

        if (!playlists) {
            return {
                statusCode: 400,
                message: "error getting playlists",
                data: null
            }
        }

        return {
            statusCode: 200,
            message: "playlists fetched successfully",
            data: playlists
        }

    }

    async createPlaylist(data: TPlaylist) {

        const playlist = await playlistRepo.createPlaylist(data);

        if (!playlist) {
            return {
                statusCode: 400,
                message: "error creating playlist",
                data: null
            }
        }

        return {
            statusCode: 201,
            message: "playlist created successfully",
            data: playlist
        }


    }

    async getPlaylistDetails(playlistId: string) {
        const playlist = await playlistRepo.getPlaylistDetails(playlistId)

        if (!playlist) {
            return {
                statusCode: 400,
                message: "error getting playlist",
                data: null
            }
        }


        return {
            statusCode: 200,
            message: "playlist fetched successfully",
            data: playlist
        }
    }

    async deletePlaylist(playlistId: string) {
        const playlist = await playlistRepo.deletePlaylist(playlistId)

        if (!playlist) {
            return {
                statusCode: 400,
                message: "error getting playlist",
                data: null
            }
        }

        return {
            statusCode: 200,
            message: "playlist deleted successfully",
            data: playlist
        }
    }

    async addProblemToPlaylist(playlistId: string, problemId: string[]) {
        const getPlaylist = await playlistRepo.getPlaylistDetails(playlistId)
      
        if (!getPlaylist) {
            return {
                statusCode: 400,
                message: "error getting playlist",
                data: null
            }
        }

        
        const addProblemToPlaylist = await playlistRepo.addProblemToPlaylist({playlistId: getPlaylist?.id as string, problemId})
        // console.log(addProblemToPlaylist, "addProblemToPlaylist")

        if (!addProblemToPlaylist) {
            return {
                statusCode: 400,
                message: "error adding problem to playlist",
                data: null
            }
        }

        return {
            statusCode: 201,
            message: "problem added to playlist successfully",
            data: addProblemToPlaylist
        }
    }

    removeProblemFromPlaylist = async (playlistId: string, problemId: string[]) => {
        const removeProblem = await playlistRepo.removeProblemFromPlaylist({playlistId, problemId})
        if (!removeProblem) {
            return {
                statusCode: 400,
                message: "error removing problem from playlist",
                data: null
            }
        }
        return {
            statusCode: 200,
            message: "problem removed from playlist successfully",
            data: removeProblem
        }
    }

}

export const playlistService = new PlaylistService();