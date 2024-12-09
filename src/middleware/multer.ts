import multer from "multer";
import fs from "fs";
import path from "path";

const uploadPath = path.join(__dirname, "tmp_uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

//const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fieldSize: 5 * 1024 * 1024 } });

export default upload;
