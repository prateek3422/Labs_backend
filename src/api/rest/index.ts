import { AppRequest, AppResponse } from "@/types"
import express from "express"
import path from "node:path"
import { globalErrorHandler, notFoundHandler } from "./configs"
import cors, { CorsOptions } from "cors"
import cookieParser from "cookie-parser"
import { commentRouter, comunityRoute, executeRouter, playlistRoute, problemRouter, submissionRouter, userRouter } from "./routes"
import passport from "passport"
import session from "express-session";
import { myEnvironment } from "@/configs"
const app = express()

const corsOptions: CorsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}
app.use(cors(corsOptions))

//passport configuration

app.use(session({
    secret: myEnvironment.SECRECT,
    resave: false,
    saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())

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
app.use("/api/v1/problems", problemRouter)
app.use("/api/v1/execute", executeRouter)
app.use("/api/v1/submissions", submissionRouter)
app.use("/api/v1/playlists", playlistRoute)
app.use("/api/v1/comunities", comunityRoute)
app.use("/api/v1/comments", commentRouter)


// 404
app.use(notFoundHandler)

//global error handle
app.use(globalErrorHandler)

export { app }
