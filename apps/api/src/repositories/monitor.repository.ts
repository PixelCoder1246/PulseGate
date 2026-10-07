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
  async create(name: string, url: string, interval?: number): Promise<Monitor> {
    return prisma.monitor.create({
      data: {
        name,
        url,
        ...(interval !== undefined && { interval }),
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

  async findById(id: string): Promise<Monitor | null> {
    return prisma.monitor.findUnique({
      where: {
        id,
      },
    });
  }

  async updateStatus(id: string, status: string): Promise<Monitor> {
    return prisma.monitor.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }

  async updateInterval(id: string, interval: number): Promise<Monitor> {
    return prisma.monitor.update({
      where: {
        id,
      },
      data: {
        interval,
      },
    });
  }

  async delete(id: string): Promise<Monitor> {
    return prisma.monitor.delete({
      where: {
        id,
      },
    });
  }
}

export const monitorRepository = new MonitorRepository();
