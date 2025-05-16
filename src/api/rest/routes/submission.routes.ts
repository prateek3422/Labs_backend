import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { AsyncErrorHandler } from "../configs";
import { submissionController } from "../controllers";


const route = Router() 

route.get("/", authMiddleware, AsyncErrorHandler(submissionController.getAllSubmissions) )
route.post("/submit", authMiddleware, AsyncErrorHandler(submissionController.createSubmission) )
route.get ("/getSubmission/:problemId", authMiddleware, AsyncErrorHandler(submissionController.getSubmissionByproblemId) )
route.get ("/getSubmissionCount/:problemId", authMiddleware, AsyncErrorHandler(submissionController.getSubmissionCount) )




export { route as submissionRouter }