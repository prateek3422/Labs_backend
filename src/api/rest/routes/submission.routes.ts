import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { AsyncErrorHandler } from "../configs";
import { submissionController } from "../controllers";
import { AdminMiddleware } from "../middlewares/adminMiddleware";


const route = Router() 

route.get("/", authMiddleware, AsyncErrorHandler(submissionController.getAllSubmissions) )
route.post("/submit", authMiddleware, AsyncErrorHandler(submissionController.createSubmission) )
route.get ("/getSubmission/:problemId", authMiddleware, AsyncErrorHandler(submissionController.getSubmissionByproblemId) )
route.get ("/getSubmissionCount/:problemId", authMiddleware, AsyncErrorHandler(submissionController.getSubmissionCount) )
route.get("/getSolvedProblem/:problemId", authMiddleware, AsyncErrorHandler(submissionController.getSolvedProblem) )
route.get("/getAllSub", authMiddleware, AdminMiddleware, AsyncErrorHandler(submissionController.getAllSub) )

export { route as submissionRouter }