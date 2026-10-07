import { Worker } from 'bullmq';
import { redis } from '../config/redis.js';
import { monitorCheckService } from '../services/monitor-check.service.js';

export const monitorWorker = new Worker(
  'monitor-checks',
  async (job) => {
    const { monitorId } = job.data;

    console.log(
      `Processing monitor check job ${job.id} for monitor ${monitorId}\n`,
    );

    const result = await monitorCheckService.checkMonitor(monitorId);

    console.log(`Monitor ${monitorId} checked successfully\n`);

    return result;
  },
  {
    connection: redis,
  },
);

monitorWorker.on('completed', (job) => {
  console.log(`Job ${job.id} completed\n`);
});

monitorWorker.on('failed', (job, error) => {
  console.error(`Job ${job?.id} failed:\n`, error.message);
});
