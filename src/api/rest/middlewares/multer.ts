import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/")
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

export const fileMiddleware = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }
})
