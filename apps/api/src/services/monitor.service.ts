import {
  monitorRepository,
  type Monitor,
} from '../repositories/monitor.repository.js';

class MonitorService {
  async createMonitor(name: string, url: string): Promise<Monitor> {
    return monitorRepository.create(name, url);
  }

  async getMonitors(): Promise<Monitor[]> {
    return monitorRepository.findAll();
  }
}

export const monitorService = new MonitorService();
