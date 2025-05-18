import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { AsyncErrorHandler } from "../configs";
import { playlistController } from "../controllers";

const route = Router()


route.get("/", authMiddleware, AsyncErrorHandler(playlistController.getAllPlaylists))
route.get("/:playlistId", authMiddleware, AsyncErrorHandler(playlistController.getPlaylistDetails))
route.post("/create", authMiddleware, AsyncErrorHandler(playlistController.createPlaylist))
route.delete("/:playlistId", authMiddleware, AsyncErrorHandler(playlistController.deletePlaylist))
route.post("/addProblem/:playlistId", authMiddleware, AsyncErrorHandler(playlistController.addProblemToPlaylist))
route.delete("/removeProblem/:playlistId", authMiddleware, AsyncErrorHandler(playlistController.removeProblemFormPlaylist))


export {route as playlistRoute}