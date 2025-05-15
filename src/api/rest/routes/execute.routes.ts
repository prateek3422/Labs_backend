import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { AsyncErrorHandler } from "../configs";
import { executeController } from "../controllers";


const route = Router() 

route.post("/createSubmission", authMiddleware, AsyncErrorHandler(executeController.executeCode) )


export { route as executeRouter }