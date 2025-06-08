import { Router } from "express";
import { contestController } from "../controllers/context.controller";
import { AsyncErrorHandler } from "../configs";
import { AdminMiddleware } from "../middlewares/adminMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router()


router.get("/get",  AsyncErrorHandler(contestController.getContest))
router.get("/:id", AsyncErrorHandler(contestController.getContestById))
router.post("/create", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(AdminMiddleware), AsyncErrorHandler(contestController.createContest))
router.delete("/delete/:id", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(AdminMiddleware), AsyncErrorHandler(contestController.deleteContest))
router.patch("/update/:id", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(AdminMiddleware), AsyncErrorHandler(contestController.updateContest))
// router.post("/toggle/:id", AsyncErrorHandler(authMiddleware), AdminMiddleware, AsyncErrorHandler(contestController.toggleContestStatus))
router.post("/join/:id", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(contestController.JoinContest))


export { router as contestRouter }