import multer from "multer"
import path from "node:path"

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "public/images/")
    },
    filename: (request, file, callback) => {
        callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

export const fileMiddleware = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }
})
