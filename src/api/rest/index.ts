import { AppRequest, AppResponse } from "@/types"
import express from "express"
import path from "node:path"
import { globalErrorHandler, notFoundHandler } from "./configs"
import cors, { CorsOptions } from "cors"
const app = express()

const corsOptions: CorsOptions = {
    origin: "*",
    credentials: true
};
app.use(cors(corsOptions));

//middlewares
app.use(express.json({ limit: "1mb" }))
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, "../../../", "public")))


app.get("/", (_request: AppRequest, response: AppResponse) => {
    response.status(200).json({ message: "server is running !!" })
})




// 404
app.use(notFoundHandler)

//global error handle
app.use(globalErrorHandler)

export { app }
