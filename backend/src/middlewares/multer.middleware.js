import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        const safeName = path.basename(file.originalname).replace(/[^a-zA-Z0-9._-]/g, "_")
        cb(null, `${Date.now()}-${safeName}`)
    }
})

export const upload = multer({ storage })