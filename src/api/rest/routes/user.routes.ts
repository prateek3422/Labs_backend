import { Router } from "express"
import { userController } from "../controllers"
import { AsyncErrorHandler } from "../configs"
import { TokenMiddleWare } from "../middlewares"

const router = Router()

router.post("/signup", AsyncErrorHandler(userController.CreateUser))
router.post("/verify", TokenMiddleWare, AsyncErrorHandler(userController.verifyEmail))
router.post("/signin", AsyncErrorHandler(userController.loginUser))

export { router as userRouter }
