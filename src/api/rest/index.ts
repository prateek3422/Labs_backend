import { AppRequest, AppResponse } from "@/types"
import express from "express"
import path from "node:path"
import { globalErrorHandler, notFoundHandler } from "./configs"
import cors, { CorsOptions } from "cors"
import cookieParser from "cookie-parser"
import { problemRouter, userRouter } from "./routes"

const app = express()

const corsOptions: CorsOptions = {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}
app.use(cors(corsOptions))

//middlewares
app.use(express.json({ limit: "1mb" }))
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, "../../../", "public")))
app.use(cookieParser())

app.get("/", (_request: AppRequest, response: AppResponse) => {
    response.status(200).json({ message: "server is running !!" })
})

//routes

app.use("/api/v1/users", userRouter)
app.use("/api/v1/problems", problemRouter )


// 404
app.use(notFoundHandler)

//global error handle
app.use(globalErrorHandler)

export { app }
