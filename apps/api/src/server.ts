import 'dotenv/config';
import app from './app.js';

import { env } from './config/env.js';
import { redis } from './config/redis.js';
import './workers/monitor.worker.js';

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
