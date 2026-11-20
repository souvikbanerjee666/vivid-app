import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tempDir = path.join(__dirname, "../../public/temp");

if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempDir)
    },
    filename: function (req, file, cb) {
        const safeName = path.basename(file.originalname).replace(/[^a-zA-Z0-9._-]/g, "_")
        cb(null, `${Date.now()}-${safeName}`)
    }
})

export const upload = multer({ storage })