import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { APIError } from '../errors';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    throw new APIError({ message: 'Unauthorized', status: httpStatus.UNAUTHORIZED });
  }
  const token = bearer.replace('Bearer ', '');

  const jwtSecret: any = process.env.JWT_SECRET;

  jwt.verify(token, jwtSecret, (err: any, payload: any) => {
    if (err) {
      throw new APIError({ message: 'Unauthorized', stack: err, status: httpStatus.UNAUTHORIZED });
    } else {
      next();
    }
  });
};
