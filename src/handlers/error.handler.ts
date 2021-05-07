import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { APIError } from '../errors';
import { handler } from './main.handler';

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
