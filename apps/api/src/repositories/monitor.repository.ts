import { prisma } from '../config/database.js';

export interface Monitor {
  id: string;
  name: string;
  url: string;
  status: string;
  interval: number;
  createdAt: Date;
  updatedAt: Date;
}

class MonitorRepository {
  async create(name: string, url: string): Promise<Monitor> {
    return prisma.monitor.create({
      data: {
        name,
        url,
      },
    });
  }

  async findAll(): Promise<Monitor[]> {
    return prisma.monitor.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

export const monitorRepository = new MonitorRepository();