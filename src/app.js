import express from 'express';
import 'dotenv/config';
import routerIndex from './route/index.js';

const app = express();

app.use(express.json());
app.use(routerIndex);

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log(`Server running at http://${process.env.APP_HOST}:${process.env.APP_PORT}`);
});
