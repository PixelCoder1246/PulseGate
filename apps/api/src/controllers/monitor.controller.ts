import type { Request, Response } from 'express';
import { monitorService } from '../services/monitor.service.js';

export async function createMonitor(req: Request, res: Response) {
  const { name, url } = req.body;

  const monitor = await monitorService.createMonitor(name, url);

  res.status(201).json({
    monitor,
  });
}

export async function getMonitors(_req: Request, res: Response) {
  const monitors = await monitorService.getMonitors();

  res.status(200).json({
    monitors,
  });
}