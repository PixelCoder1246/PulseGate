import {
  monitorRepository,
  type Monitor,
} from '../repositories/monitor.repository.js';

import { monitorSchedulerService } from './monitor-scheduler.service.js';

class MonitorService {
  async createMonitor(
    name: string,
    url: string,
    interval?: number,
  ): Promise<Monitor> {
    const monitor = await monitorRepository.create(name, url, interval);

    await monitorSchedulerService.scheduleMonitor(monitor.id, monitor.interval);

    return monitor;
  }

  async pauseMonitor(monitorId: string): Promise<Monitor> {
    const monitor = await monitorRepository.findById(monitorId);

    if (!monitor) {
      throw new Error('Monitor not found');
    }

    await monitorSchedulerService.removeMonitorSchedule(monitorId);

    return monitorRepository.updateStatus(monitorId, 'paused');
  }

  async getMonitors(): Promise<Monitor[]> {
    return monitorRepository.findAll();
  }

  async resumeMonitor(monitorId: string): Promise<Monitor> {
    const monitor = await monitorRepository.findById(monitorId);

    if (!monitor) {
      throw new Error('Monitor not found');
    }

    await monitorSchedulerService.scheduleMonitor(monitor.id, monitor.interval);

    return monitorRepository.updateStatus(monitorId, 'active');
  }

  async updateMonitorInterval(
    monitorId: string,
    interval: number,
  ): Promise<Monitor> {
    const monitor = await monitorRepository.findById(monitorId);

    if (!monitor) {
      throw new Error('Monitor not found');
    }

    const updatedMonitor = await monitorRepository.updateInterval(
      monitorId,
      interval,
    );

    if (updatedMonitor.status === 'active') {
      await monitorSchedulerService.scheduleMonitor(
        updatedMonitor.id,
        updatedMonitor.interval,
      );
    }

    return updatedMonitor;
  }

  async deleteMonitor(monitorId: string): Promise<Monitor> {
    const monitor = await monitorRepository.findById(monitorId);

    if (!monitor) {
      throw new Error('Monitor not found');
    }

    await monitorSchedulerService.removeMonitorSchedule(monitorId);

    return monitorRepository.delete(monitorId);
  }
}

export const monitorService = new MonitorService();
