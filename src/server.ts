import { fileURLToPath } from 'url';
import app from './routes/index.js';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const accessLogStream = fs.createWriteStream(path.join(__dirname, '..', 'logs', 'access.log'), {
  flags: 'a',
});

app.use(morgan('combined', { stream: accessLogStream }));
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
