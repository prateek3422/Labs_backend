import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { AdminMiddleware } from "../middlewares/adminMiddleware";
import { problemController } from "../controllers";
import { AsyncErrorHandler } from "../configs";

const router = Router()

router.post("/createProblem", AsyncErrorHandler(authMiddleware),  AsyncErrorHandler(AdminMiddleware), AsyncErrorHandler(problemController.createProblem))
router.get("/getAllProblems", AsyncErrorHandler(problemController.getAllProblems))
router.get("/getProblems/:id", AsyncErrorHandler(problemController.getProblemById))
router.get("/update/:id", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(authMiddleware), AsyncErrorHandler(problemController.updateProblem))
router.get("/solve", AsyncErrorHandler(authMiddleware),AsyncErrorHandler(problemController.getAllProblemsSolvedByUser))
router.delete("/deleteProblem/:id", AsyncErrorHandler(authMiddleware),  AsyncErrorHandler(AdminMiddleware), AsyncErrorHandler(problemController.deleteProblem))
export { router as problemRouter }