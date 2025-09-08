import express from 'express';
import { loggerMiddleware } from './middlewares/logger.js';
import router from './routes/index.js';

const app = express();

loggerMiddleware.forEach((mw) => app.use(mw));

app.use(router);

export default app;
