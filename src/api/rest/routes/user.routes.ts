import { Router, Request, Response, RequestHandler } from "express"
import { profileController, userController } from "../controllers"
import { AsyncErrorHandler } from "../configs"
import { TokenMiddleWare } from "../middlewares"
import { authMiddleware } from "../middlewares/authMiddleware"
import { fileMiddleware } from "../middlewares/multer"
import passport from "passport"
import "../../../utils/passport"
import { RefreshMiddleware } from "../middlewares/refresh"

const router = Router()

router.post("/signup", AsyncErrorHandler(userController.CreateUser))
router.post("/verify", AsyncErrorHandler(TokenMiddleWare), AsyncErrorHandler(userController.verifyEmail))
router.post("/signin", AsyncErrorHandler(userController.loginUser))
router.post("/signout", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(userController.logOutUser))
router.get("/getuser", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(userController.getuser))
router.get("/getuser/:id",  AsyncErrorHandler(userController.getuserById))
router.get("/getalluser", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(userController.getAllUser))
router.patch("/updateuser", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(userController.refreshToken))
router.patch("/forgotpassword", AsyncErrorHandler(userController.forgotPassword))
router.patch("/resetpassword", AsyncErrorHandler(userController.resetPassword))
router.post("/sendverificationemail", AsyncErrorHandler(userController.resendEmailVerify))
router.patch("/ImageUpload", AsyncErrorHandler(fileMiddleware.single("image")), AsyncErrorHandler(authMiddleware), AsyncErrorHandler(profileController.uploadProfilePicture))
router.post("/refresh", AsyncErrorHandler(RefreshMiddleware), AsyncErrorHandler(userController.refreshToken))
// router.post("/activity", AsyncErrorHandler(authMiddleware), AsyncErrorHandler(profileController.userActivity))

// Type-safe passport authentication handlers
const googleAuth = passport.authenticate("google", { scope: ["profile", "email"] }) as RequestHandler;
const githubAuth = passport.authenticate("github", { scope: ["profile", "email"] }) as RequestHandler;
const googleCallback = passport.authenticate("google", { failureRedirect: "/login" }) as RequestHandler;
const githubCallback = passport.authenticate("github", { failureRedirect: "/login" }) as RequestHandler;

router.get("/google", 
    googleAuth,
    (_request: Request, response: Response) => {
        response.send("You are being redirected to Google for authentication. Please wait...");
    }
)

router.get("/github", 
    githubAuth,
    (_request: Request, response: Response) => {
        response.send("You are being redirected to GitHub for authentication. Please wait...");
    }
)

router.get("/google/callback", 
    googleCallback,
    AsyncErrorHandler(userController.handleSocialLogin)
)

router.get("/github/callback", 
    githubCallback,
    AsyncErrorHandler(userController.handleSocialLogin)
)

export { router as userRouter }
