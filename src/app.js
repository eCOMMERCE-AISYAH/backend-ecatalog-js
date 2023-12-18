import express from 'express';
import 'dotenv/config';
// eslint-disable-next-line import/extensions
import routerIndex from './route/index.js';

const app = express();

app.use(express.json());
app.use(routerIndex);

app.listen(process.env.APP_PORT, () => {
  console.log('server running at port', process.env.APP_PORT);
});
