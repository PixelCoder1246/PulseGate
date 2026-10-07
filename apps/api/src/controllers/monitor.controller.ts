import type { Request, Response } from 'express';
import { monitorService } from '../services/monitor.service.js';
import { monitorCheckService } from '../services/monitor-check.service.js';

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

export async function checkMonitor(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== 'string') {
    return res.status(400).json({
      error: 'Monitor ID is required',
    });
  }

  const check = await monitorCheckService.checkMonitor(id);

  res.status(200).json({
    check,
  });
}
