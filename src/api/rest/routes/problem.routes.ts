import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { AdminMiddleware } from "../middlewares/adminMiddleware";
import { problemController } from "../controllers";
import { AsyncErrorHandler } from "../configs";

const router = Router()

router.post("/createProblem", authMiddleware, AdminMiddleware, AsyncErrorHandler(problemController.createProblem))
router.get("/getAllProblems", AsyncErrorHandler(problemController.getAllProblems))
router.get("/getProblems/:id", AsyncErrorHandler(problemController.getProblemById))
router.get("/update/:id", authMiddleware, authMiddleware, AsyncErrorHandler(problemController.updateProblem))
router.get("/solve", authMiddleware,AsyncErrorHandler(problemController.getAllProblemsSolvedByUser))
router.delete("/deleteProblem/:id", authMiddleware, AdminMiddleware, AsyncErrorHandler(problemController.deleteProblem))
export { router as problemRouter }