import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { AsyncErrorHandler } from "../configs";
import { commentController } from "../controllers";

const route = Router()

route.post("/create", authMiddleware, AsyncErrorHandler(commentController.createComment))
// route.get("/:comunityId", authMiddleware, AsyncErrorHandler(commentController.getCommentById))
route.get("/", authMiddleware, AsyncErrorHandler(commentController.getAllComments))
route.patch("/update/:comunityId", authMiddleware, AsyncErrorHandler(commentController.updateComment))
route.delete("/delete/:comunityId", authMiddleware, AsyncErrorHandler(commentController.deleteComment))

export { route as commentRouter }