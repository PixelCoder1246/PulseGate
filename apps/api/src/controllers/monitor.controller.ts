import type { Request, Response } from 'express';
import { monitorService } from '../services/monitor.service.js';
import { monitorCheckService } from '../services/monitor-check.service.js';

export async function createMonitor(req: Request, res: Response) {
  const { name, url, interval } = req.body;

  const monitor = await monitorService.createMonitor(name, url, interval);

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

export async function enqueueMonitorCheck(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== 'string') {
    return res.status(400).json({
      error: 'Monitor ID is required',
    });
  }

  const job = await monitorCheckService.enqueueMonitorCheck(id);

  res.status(202).json({
    message: 'Monitor check queued',
    jobId: job.id,
  });
}

export async function pauseMonitor(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== 'string') {
    return res.status(400).json({
      error: 'Monitor ID is required',
    });
  }

  const monitor = await monitorService.pauseMonitor(id);

  res.status(200).json({
    message: 'Monitor paused',
    monitor,
  });
}

export async function resumeMonitor(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== 'string') {
    return res.status(400).json({
      error: 'Monitor ID is required',
    });
  }

  const monitor = await monitorService.resumeMonitor(id);

  res.status(200).json({
    message: 'Monitor resumed',
    monitor,
  });
}

export async function updateMonitorInterval(req: Request, res: Response) {
  const { id } = req.params;
  const { interval } = req.body;

  if (typeof id !== 'string') {
    return res.status(400).json({
      error: 'Monitor ID is required',
    });
  }

  if (
    typeof interval !== 'number' ||
    !Number.isInteger(interval) ||
    interval < 30
  ) {
    return res.status(400).json({
      error: 'Interval must be an integer of at least 30 seconds',
    });
  }

  const monitor = await monitorService.updateMonitorInterval(id, interval);

  res.status(200).json({
    message: 'Monitor interval updated',
    monitor,
  });
}

export async function deleteMonitor(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== 'string') {
    return res.status(400).json({
      error: 'Monitor ID is required',
    });
  }

  await monitorService.deleteMonitor(id);

  res.status(204).send();
}
