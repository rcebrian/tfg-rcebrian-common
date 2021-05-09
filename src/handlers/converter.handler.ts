import {
  Request, Response, NextFunction,
} from 'express';
import httpStatus from 'http-status';
import { APIError } from '../errors';
import { handler } from './main.handler';

/**
 * When an error occurs, generate an instance of APIError
 * @param req request with input form
 * @param res response
 * @param next next call
 * @returns
 */
export const errorHandlerConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
  let convertedError = err;

  if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: 'Internal server error',
      status: err.status || httpStatus.INTERNAL_SERVER_ERROR,
      stack: err.stack,
    });
  }
  return handler(convertedError, req, res, next);
};
