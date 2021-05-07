import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { APIError } from '../errors';

export const handler = (err: APIError, req: Request, res: Response, next: NextFunction) => {
  const error = {
    code: err.status || httpStatus.INTERNAL_SERVER_ERROR,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
    timestamp: new Date().toISOString(),
    URL: req.originalUrl,
  };

  if (process.env.APP_ENV !== 'development') {
    delete error.stack;
  }

  res.status(error.code).json({ error });
};
