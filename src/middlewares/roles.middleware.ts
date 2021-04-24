import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { APIError } from '../errors';

/**
 * Validate the input in requests
 * @param role
 * @param _req request with input form
 * @param _res response
 * @param _next next call
 * @returns
 */
const checkRole = (role: string, _req: Request, _res: Response, _next: NextFunction) => {
  const bearer = _req.headers.authorization;

  if (!bearer) {
    throw new APIError({ message: 'Unauthorized', status: httpStatus.UNAUTHORIZED });
  }
  const token = bearer.replace('Bearer ', '');

  const jwtSecret: any = process.env.JWT_SECRET;

  jwt.verify(token, jwtSecret, (err: any, payload: any) => {
    if (!err && payload.role === role) {
      _next();
    } else {
      throw new APIError({ message: 'Unauthorized', stack: err, status: httpStatus.UNAUTHORIZED });
    }
  });
};

export const roleAdmin = (req: Request, res: Response, next: NextFunction) => {
  checkRole('ROLE_ADMIN', req, res, next);
};

export const roleCompany = (req: Request, res: Response, next: NextFunction) => {
  checkRole('ROLE_COMPANY', req, res, next);
};

export const roleMonitor = (req: Request, res: Response, next: NextFunction) => {
  checkRole('ROLE_MONITOR', req, res, next);
};

export const roleUser = (req: Request, res: Response, next: NextFunction) => {
  checkRole('ROLE_USER', req, res, next);
};
