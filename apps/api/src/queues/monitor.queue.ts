import { Queue } from 'bullmq';
import { redis } from '../config/redis.js';

export const monitorQueue = new Queue('monitor-checks', {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: 100,
    removeOnFail: 1000,
  },
});
