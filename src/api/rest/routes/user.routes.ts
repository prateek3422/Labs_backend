import { Router } from "express"
import { userController } from "../controllers"
import { AsyncErrorHandler } from "../configs"
import { TokenMiddleWare } from "../middlewares"
import { authMiddleware } from "../middlewares/authMiddleware"

const router = Router()

router.post("/signup", AsyncErrorHandler(userController.CreateUser))
router.post("/verify", TokenMiddleWare, AsyncErrorHandler(userController.verifyEmail))
router.post("/signin", AsyncErrorHandler(userController.loginUser))
router.post("/signout", authMiddleware, AsyncErrorHandler(userController.logOutUser))
router.get("/getuser", authMiddleware, AsyncErrorHandler(userController.getuser))
router.get("/getalluser", authMiddleware, AsyncErrorHandler(userController.getAllUser))
router.patch("/updateuser", authMiddleware, AsyncErrorHandler(userController.refreshToken))
router.patch("/forgotpassword", AsyncErrorHandler(userController.forgotPassword))
router.patch("/resetpassword", AsyncErrorHandler(userController.resetPassword)

)

export { router as userRouter }
