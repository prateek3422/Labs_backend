
import { Router } from "express";
import { userController } from "../controllers";
import { AsyncErrorHandler } from "../configs";


const router = Router()


router.post("/signup", AsyncErrorHandler(userController.CreateUser))



export {router as userRouter}