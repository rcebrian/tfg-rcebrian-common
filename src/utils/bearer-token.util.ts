/* eslint-disable max-len */
import * as jwt from 'jsonwebtoken';
import { IncomingHttpHeaders } from 'node:http';
import { TokenPropertiesEnum } from '../enums';

/**
 * Get a jwt value from bearer payload
 * @param headers IncomingHttpHeaders to get auth
 * @param key TokenPropertiesEnum
 * @returns selected key from bearer token
 */
export const getPropertyFromBearerToken = (headers: IncomingHttpHeaders, key: TokenPropertiesEnum): string => {
  const token: any = headers.authorization?.replace('Bearer ', '');
  const decoded = jwt.decode(token, { complete: true });
  const payload: any = decoded?.payload;

  return payload[key];
};
