import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { AsyncErrorHandler } from "../configs";
import { submissionController } from "../controllers";
import { AdminMiddleware } from "../middlewares/adminMiddleware";


const route = Router() 

route.get("/", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(submissionController.getAllSubmissions) )
route.post("/submit", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(submissionController.createSubmission) )
route.get ("/getSubmission/:problemId", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(submissionController.getSubmissionByproblemId) )
route.get ("/getSubmissionCount/:problemId", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(submissionController.getSubmissionCount) )
route.get("/getSolvedProblem/:problemId", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(submissionController.getSolvedProblem) )
route.get("/getAllSub", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(AdminMiddleware), AsyncErrorHandler(submissionController.getAllSub) )

export { route as submissionRouter }