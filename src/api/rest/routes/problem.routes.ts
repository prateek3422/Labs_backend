import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { AdminMiddleware } from "../middlewares/adminMiddleware";
import { problemController } from "../controllers";
import { AsyncErrorHandler } from "../configs";

const router = Router()

router.post("/createProblem",  authMiddleware, AdminMiddleware,AsyncErrorHandler(problemController.createProblem))
router.get("/getAllProblems",  AsyncErrorHandler(problemController.getAllProblems))
router.get("/getProblems/:id",  AsyncErrorHandler(problemController.getProblemById))


export {router as problemRouter}