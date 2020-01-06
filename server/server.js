import express from 'express';
import debug from 'debug';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';
import errorHandler from '@middlewares/errorHandler';
import logger from 'morgan';
import apis from '@routes/api';

config();
const debugged = debug('app');

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origen: '*',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(helmet());
app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', apis);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use(errorHandler);

app.listen(PORT, () => debugged(`listening from port ${PORT}`));

export default app;