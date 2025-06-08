import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { AsyncErrorHandler } from "../configs";
import { playlistController } from "../controllers";

const route = Router()


route.get("/", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(playlistController.getAllPlaylists))
route.get("/:playlistId", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(playlistController.getPlaylistDetails))
route.post("/create", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(playlistController.createPlaylist))
route.delete("/:playlistId", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(playlistController.deletePlaylist))
route.post("/addProblem/:playlistId", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(playlistController.addProblemToPlaylist))
route.delete("/removeProblem/:playlistId", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(playlistController.removeProblemFormPlaylist))


export {route as playlistRoute}