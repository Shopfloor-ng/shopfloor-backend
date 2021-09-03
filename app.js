import express from 'express';
import DB from './config/db';
import CORS from './middlewares/cors';
import notfound from './middlewares/notfound';
import error from './middlewares/error';
import { restRouter } from './api';

const app = express();
const PORT = 3000;
const IFACE = "0.0.0.0"

// crate database connection
DB.connect();

app.use(express.json());
app.use(CORS.handleCors);
app.use('/api', restRouter);
app.use(notfound);
app.use(error);

app.listen(PORT, IFACE, () => {
    console.log(`Server is running at ${IFACE}:${PORT}`);
});