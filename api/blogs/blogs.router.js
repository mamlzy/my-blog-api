const { store } = require('./blogs.controller');
const multer = require('multer');
const path = require('path');

// storage engine
const storage = multer.diskStorage({
  destination: 'upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000, // 1mb
  },
})

module.exports = (app) => {
  app.post('/blogs', upload.single('file'), store);
}