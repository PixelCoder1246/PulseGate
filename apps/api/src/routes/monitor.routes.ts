import { Router } from 'express';

import {
  createMonitor,
  getMonitors,
  checkMonitor,
  enqueueMonitorCheck,
  pauseMonitor,
  resumeMonitor,
  updateMonitorInterval,
  deleteMonitor,
} from '../controllers/monitor.controller.js';

import { validateCreateMonitor } from '../validators/monitor.validator.js';

const router = Router();

router.post('/', validateCreateMonitor, createMonitor);
router.get('/', getMonitors);
router.post('/:id/check', checkMonitor);
router.post('/:id/check/queue', enqueueMonitorCheck);

router.post('/:id/pause', pauseMonitor);
router.post('/:id/resume', resumeMonitor);

router.patch('/:id/interval', updateMonitorInterval);

router.delete('/:id', deleteMonitor);

export default router;
