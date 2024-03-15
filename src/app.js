import express from 'express';
import 'dotenv/config';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import routerIndex from './route/index.js';

const app = express();
const dirname = path.resolve();
app.use(cors({
  credentials: false,
  origin: '*',
}));
app.use(morgan('combined'));

app.use(express.json());

app.use('/public/images', express.static(path.join(dirname, '/public/images')));
app.use(routerIndex);

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log(`Server running at http://${process.env.APP_HOST}:${process.env.APP_PORT}`);
});
