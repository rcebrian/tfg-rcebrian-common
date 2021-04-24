import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { APIError } from '../errors';

const handler = (err: APIError, req: Request, res: Response, next: NextFunction) => {
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

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let convertedError = err;

  if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status || httpStatus.INTERNAL_SERVER_ERROR,
      stack: err.stack,
    });
  }

  return handler(convertedError, req, res, next);
};
