import express from 'express';
import 'dotenv/config';
import path from 'path';
import routerIndex from './route/index.js';

const app = express();
const dirname = path.resolve();
console.log(dirname);

app.use(express.json());

app.use(routerIndex);
app.use('/images', express.static(path.join(dirname, 'public/images')));

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log(`Server running at http://${process.env.APP_HOST}:${process.env.APP_PORT}`);
});
