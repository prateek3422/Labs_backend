import { Router } from "express";
import { contestController } from "../controllers/context.controller";
import { AsyncErrorHandler } from "../configs";
import { AdminMiddleware } from "../middlewares/adminMiddleware";

const router = Router()


router.get("/",  AsyncErrorHandler(contestController.getContest))
router.get("/:id", AsyncErrorHandler(contestController.getContestById))
router.post("/create", AdminMiddleware, AsyncErrorHandler(contestController.createContest))
router.delete("/delete/:id", AdminMiddleware, AsyncErrorHandler(contestController.deleteContest))
router.patch("/update/:id", AdminMiddleware, AsyncErrorHandler(contestController.updateContest))
router.post("/toggle/:id", AdminMiddleware, AsyncErrorHandler(contestController.toggleContestStatus))
