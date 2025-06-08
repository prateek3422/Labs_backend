import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { AsyncErrorHandler } from "../configs";
import { comunityController } from "../controllers";

const route = Router()

route.post("/create", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(comunityController.createComunity))
route.get("/", AsyncErrorHandler(comunityController.getAllComunity))
route.get("/:id", AsyncErrorHandler(comunityController.getComunityById))
route.patch("/update/:id", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(comunityController.updateComunity))
route.delete("/delete/:id", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(comunityController.deleteComunity))

export { route as comunityRoute }
