import type { Request, Response, NextFunction } from 'express';

export function validateCreateMonitor(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, url } = req.body;

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
    new URL(url);
  } catch {
    return res.status(400).json({
      error: 'Monitor URL must be a valid URL',
    });
  }

  next();
}
