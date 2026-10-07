import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import monitorRoutes from './routes/monitor.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'pulsegate-api',
  });
});

app.use('/api/monitors', monitorRoutes);

app.use(errorMiddleware);

export default app;