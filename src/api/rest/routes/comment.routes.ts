import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { AsyncErrorHandler } from "../configs";
import { commentController } from "../controllers";

const route = Router()

route.post("/create", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(commentController.createComment))
// route.get("/:comunityId", authMiddleware, AsyncErrorHandler(commentController.getCommentById))
route.get("/", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(commentController.getAllComments))
route.patch("/update", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(commentController.updateComment))
route.delete("/delete", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(commentController.deleteComment))

export { route as commentRouter }