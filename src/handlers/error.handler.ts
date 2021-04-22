import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import APIError from '../errors';

const handler = (_err: APIError, _req: Request, _res: Response, _next: NextFunction) => {
  const error = {
    code: _err.status || httpStatus.INTERNAL_SERVER_ERROR,
    message: _err.message || httpStatus[_err.status],
    errors: _err.errors,
    stack: _err.stack,
    timestamp: new Date().toISOString(),
    URL: _req.originalUrl,
  };

  if (process.env.NODE_ENV !== 'development') {
    delete error.stack;
  }

  _res.status(error.code).json({ error });
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

export default errorHandler;
