import { monitorRepository } from '../repositories/monitor.repository.js';
import { monitorCheckRepository } from '../repositories/monitor-check.repository.js';

class MonitorCheckService {
  async checkMonitor(monitorId: string) {
    const monitor = await monitorRepository.findById(monitorId);

    if (!monitor) {
      throw new Error('Monitor not found');
    }

    const startTime = Date.now();

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 10_000);

    try {
      const response = await fetch(monitor.url, {
        method: 'GET',
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const responseTime = Date.now() - startTime;

      const success = response.status >= 200 && response.status < 400;

      const check = await monitorCheckRepository.create({
        monitorId: monitor.id,
        statusCode: response.status,
        responseTime,
        success,
      });

      return check;
    } catch (error) {
      clearTimeout(timeout);

      const responseTime = Date.now() - startTime;

      const errorMessage =
        error instanceof Error
          ? error.name === 'AbortError'
            ? 'Request timed out'
            : error.message
          : 'Unknown error';

      const check = await monitorCheckRepository.create({
        monitorId: monitor.id,
        responseTime,
        success: false,
        errorMessage,
      });

      return check;
    }
  }
}

export const monitorCheckService = new MonitorCheckService();
