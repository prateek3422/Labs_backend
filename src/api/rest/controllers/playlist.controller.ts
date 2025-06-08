import { AppNextFunction, AppRequest, AppResponse } from "@/types";
import { addProblemToPlaylist, createPlaylist } from "../validation";
import { HttpError } from "../configs";
import { playlistService } from "@/services/playlist.service";

class PlaylistController {
    getAllPlaylists = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {

        const userId = request.user?.id
        if (!userId) {
            return next(new HttpError("please login", 400));
        }

        const result = await playlistService.getAllPlaylists(userId);

        if (result.statusCode === 200) {
            response.status(200).json({
                message: result.message,
                data: result.data
            })
        } else {
            return next(new HttpError(result.message, result.statusCode));
        }

    }

    createPlaylist = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { data, error } = createPlaylist.safeParse(request.body);

        if (error) {
            return next(new HttpError(error.issues[0].message, 400));

        }

        const userId = request.user?.id;

        if (!userId) {
            return next(new HttpError("please login", 400));
        }

        const result = await playlistService.createPlaylist({
            ...data,
            userId,
        });

        if (result.statusCode === 201) {
            response.status(201).json({
                message: result.message,
                data: result.data
            })
        } else {
            return next(new HttpError(result.message, result.statusCode));
        }
    }

    getPlaylistDetails = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { playlistId } = request.params
        if (!playlistId) {
            return next(new HttpError("please provide playlist id", 400));
        }

        const result = await playlistService.getPlaylistDetails(playlistId);

        if (result.statusCode === 200) {
            response.status(200).json({
                message: result.message,
                data: result.data
            })
        } else {
            return next(new HttpError(result.message, result.statusCode));
        }
    }

    deletePlaylist = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { playlistId } = request.params

        if (!playlistId) {
            return next(new HttpError("please provide playlist id", 400));
        }

        const result = await playlistService.deletePlaylist(playlistId);

        if (result.statusCode === 200) {
            response.status(200).json({
                message: result.message,
                data: result.data
            })
        } else {
            return next(new HttpError(result.message, result.statusCode));
        }
    }

    addProblemToPlaylist = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { playlistId } = request.params

        const { data, error } = addProblemToPlaylist.safeParse(request.body);
        if (error) {
            return next(new HttpError(error.issues[0].message, 400));
        }

        if (!playlistId) {
            return next(new HttpError("please provide playlist id", 400));
        }

        const result = await playlistService.addProblemToPlaylist(playlistId, data?.problemId);
        if (result.statusCode === 201) {
            response.status(200).json({
                message: result.message,
                data: result.data
            })
        } else {
            return next(new HttpError(result.message, result.statusCode));
        }
    }

    removeProblemFormPlaylist = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { playlistId } = request.params
        const { data, error } = addProblemToPlaylist.safeParse(request.body);

        if (error) {
            return next(new HttpError(error.issues[0].message, 400));
        }

        if (!playlistId) {
            return next(new HttpError("please provide playlist id", 400));
        }
        const result = await playlistService.removeProblemFromPlaylist(playlistId, data?.problemId);
        if (result.statusCode === 200) {
            response.status(200).json({
                message: result.message,
                data: result.data
            })
        } else {
            return next(new HttpError(result.message, result.statusCode));
        }

    }

    
}

export const playlistController = new PlaylistController();