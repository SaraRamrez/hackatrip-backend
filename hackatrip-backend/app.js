import express from 'express';

import fileUpload from 'express-fileupload';

import cors from 'cors';

import morgan from 'morgan';

import { PORT, UPLOADS_DIR } from './env.js';

import routes from './src/routes/index.js';

import {
    errorController,
    notFoundController,
} from './src/controllers/errors/index.js';

const app = express();

app.use(express.json());

app.use(fileUpload());

app.use(express.static(UPLOADS_DIR));

app.use(cors());

app.use(morgan('dev'));

app.use(routes);

app.use(notFoundController);

app.use(errorController);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
