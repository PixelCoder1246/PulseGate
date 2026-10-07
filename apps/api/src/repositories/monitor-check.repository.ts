import { prisma } from '../config/database.js';

export interface MonitorCheck {
  id: string;
  monitorId: string;
  statusCode: number | null;
  responseTime: number | null;
  success: boolean;
  errorMessage: string | null;
  checkedAt: Date;
}

class MonitorCheckRepository {
  async create(data: {
    monitorId: string;
    statusCode?: number;
    responseTime?: number;
    success: boolean;
    errorMessage?: string;
  }): Promise<MonitorCheck> {
    return prisma.monitorCheck.create({
      data,
    });
  }
}

export const monitorCheckRepository = new MonitorCheckRepository();