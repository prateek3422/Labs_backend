import { Router } from "express";
import { contestController } from "../controllers/context.controller";
import { AsyncErrorHandler } from "../configs";
import { AdminMiddleware } from "../middlewares/adminMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router()


router.get("/get",  AsyncErrorHandler(contestController.getContest))
router.get("/:id", AsyncErrorHandler(contestController.getContestById))
router.post("/create", authMiddleware, AdminMiddleware, AsyncErrorHandler(contestController.createContest))
router.delete("/delete/:id", authMiddleware,AdminMiddleware, AsyncErrorHandler(contestController.deleteContest))
router.patch("/update/:id", authMiddleware,AdminMiddleware, AsyncErrorHandler(contestController.updateContest))
// router.post("/toggle/:id", authMiddleware, AdminMiddleware, AsyncErrorHandler(contestController.toggleContestStatus))
router.post("/join/:id", authMiddleware, AsyncErrorHandler(contestController.JoinContest))


export { router as contestRouter }