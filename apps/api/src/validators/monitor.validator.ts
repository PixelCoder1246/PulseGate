import type { Request, Response, NextFunction } from 'express';

export function validateCreateMonitor(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, url, interval } = req.body;

  if (typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({
      error: 'Monitor name is required',
    });
  }

  if (typeof url !== 'string' || url.trim().length === 0) {
    return res.status(400).json({
      error: 'Monitor URL is required',
    });
  }

  try {
    const parsedUrl = new URL(url);

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return res.status(400).json({
        error: 'Monitor URL must use HTTP or HTTPS',
      });
    }
  } catch {
    return res.status(400).json({
      error: 'Monitor URL must be a valid URL',
    });
  }

  if (
    interval !== undefined &&
    (typeof interval !== 'number' ||
      !Number.isInteger(interval) ||
      interval < 30)
  ) {
    return res.status(400).json({
      error: 'Interval must be an integer of at least 30 seconds',
    });
  }

  next();
}
