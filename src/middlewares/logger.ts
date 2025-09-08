import { fileURLToPath } from 'url';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const accessLogStream = fs.createWriteStream(path.join(__dirname, '..', 'logs', 'access.log'), {
  flags: 'a',
});

export const loggerMiddleware = [
  morgan('combined', { stream: accessLogStream }),
  ...(process.env.NODE_ENV !== 'production' ? [morgan('dev')] : []),
];