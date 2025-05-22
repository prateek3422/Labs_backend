import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { AsyncErrorHandler } from "../configs";
import { comunityController } from "../controllers";

const route = Router()

route.post("/create", authMiddleware, AsyncErrorHandler(comunityController.createComunity))
route.get("/all", AsyncErrorHandler(comunityController.getAllComunity))
route.get("/:id", AsyncErrorHandler(comunityController.getComunityById))
route.patch("/update/:id", authMiddleware, AsyncErrorHandler(comunityController.updateComunity))
route.delete("/delete/:id", authMiddleware, AsyncErrorHandler(comunityController.deleteComunity))

export {route as comunityRoute}