const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    const originalPath = path.join(uploadDir, file.originalname);
    if(fs.existsSync(originalPath)){
      console.log(`La imagen ${file.originalname} ya existe en la carpeta uploads.`);
      file.existing = true;
      file.filename = file.originalname;
      return cb(null, file.originalname);
    }
    const nombre = file.originalname;
    cb(null, nombre);
  }
});

const upload = multer({ storage });

module.exports = upload;
