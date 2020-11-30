/* eslint-disable spaced-comment */
/* eslint-disable import/no-unresolved */

import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import config from '../config.js';/* don't forget to add.js otherwise it doesn't find it */

const MIME_TYPES = { 
  'image/jpg': 'jpg', 
  'image/jpeg': 'jpeg',
  'image/png': 'png'
};


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => { 
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype]; 
    cb(null, `${name + Date.now()}.${  extension}`);
  }
});

const upload = multer({ storage });

const uploadRouter = express.Router();

uploadRouter.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});



aws.config.update({
  accessKeyId: config.AMAZON_ACCESS_KEY_ID,
  secretAccessKey: config.AMAZON_SECRET_ACCESS_KEY,
});

const s3 = new aws.S3();
const storageS3 = multerS3({
  s3,
  bucket: 'amazona-bucket-image', /* don't forget to change the name of bucket */
  acl:'public-read', /* means it is going to be public visible*/
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key(req, file, cb){
    cb(null, file.originalname);
  },
});

const uploadS3 = multer({storage: storageS3});
uploadRouter.post('/s3', uploadS3.single('image'), (req, res) => {
  res.send(req.file.location);
});

export default uploadRouter;
