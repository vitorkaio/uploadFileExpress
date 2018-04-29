import express from 'express';
import multer from 'multer';

const router = express.Router();

// Salvando arquivo no hard disk
/*const storageStrategy = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({storage: storageStrategy})*/

// Pega o arquivo em memória para mandar pro dropbox ou outro serviço de cloud storage.
const storage = multer.memoryStorage()
const upload = multer({ storage })

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', (req, res, next) => {
  res.status(200).json({
    msg: "home routes!"
  })
});

router.post('/upload', upload.single('arq'),(req, res, next) => {
  console.log('Should be undefined:', req.file.originalname)
  console.log('Should be the buffer:', req.file.buffer)
  // console.log(req.file.buffer);
  res.status(200).json({
    msg: "upload route"
  });
});

export default router;