import { Router } from 'express';

import {
  createMonitor,
  getMonitors,
} from '../controllers/monitor.controller.js';

import { validateCreateMonitor } from '../validators/monitor.validator.js';

const router = Router();

router.post('/', validateCreateMonitor, createMonitor);
router.get('/', getMonitors);

export default router;