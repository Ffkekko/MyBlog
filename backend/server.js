/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import http from 'http';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
/* import cors from 'cors'; */
import config from './config.js';
import userRouter from './routers/userRouter.js';
import postRouter from './routers/postRouter.js';
import uploadRouter from './routers/uploadRouter.js';


const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('db connected.'))
  .catch((error) => console.log(error.reason));

const app = express();
app.use(bodyParser.json());
/* app.use(cors()); */

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); 
  next();
});

app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/frontend/build/index.html`));
});
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});


app.listen(config.PORT, () => {
  console.log(`Server started at http://localhost:${config.PORT}`);
});

// app.listen(config.PORT, () => {
//   console.log('Server started at http://localhost:5000');
// });
