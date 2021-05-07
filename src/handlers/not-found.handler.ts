import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { APIError } from '../errors';
import { handler } from './main.handler';

/**
 * Instances an APIError when is a 404
 * @param req incoming request
 * @param res outgoing response
 * @param next next function
 * @returns APIError
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res, next);
};
