import { monitorQueue } from '../queues/monitor.queue.js';

class MonitorSchedulerService {
  async scheduleMonitor(monitorId: string, interval: number) {
    const schedulerId = `monitor-${monitorId}`;

    await monitorQueue.upsertJobScheduler(
      schedulerId,
      {
        every: interval * 1000,
      },
      {
        name: 'monitor-check',
        data: {
          monitorId,
        },
      },
    );
  }

  async removeMonitorSchedule(monitorId: string) {
    const schedulerId = `monitor-${monitorId}`;

    await monitorQueue.removeJobScheduler(schedulerId);
  }
}

export const monitorSchedulerService = new MonitorSchedulerService();
