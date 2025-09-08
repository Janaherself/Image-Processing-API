import express from 'express';
import type { Request, Response } from 'express';
import { handleResizeRequest } from '../utilities/resizeRequestHandler.js';

const app = express();

app.get('/resize', async (req: Request, res: Response) => {
  const { path: filename, width, height } = req.query;
  await handleResizeRequest(
    req,
    res,
    filename as string | undefined,
    width as string | undefined,
    height as string | undefined,
  );
});

export default app;
