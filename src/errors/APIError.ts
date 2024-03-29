// eslint-disable-next-line max-classes-per-file
import httpStatus from 'http-status';

/**
 * @extends Error
 */
class ExtendableError extends Error {
  errors: any;

  status: any;

  isPublic: any;

  isOperational: any;

  constructor({
    message, errors, status, isPublic, stack,
  }: any) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    this.stack = stack;
    // Error.captureStackTrace(this, this.constructor.name);
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
export default class APIError extends ExtendableError {
/**
 * Creates an API error.
 * @param {string} message - Error message.
 * @param errors
 * @param stack
 * @param {number} status - HTTP status code of error.
 * @param {boolean} isPublic - Whether the message should be visible to user or not.
 */
  constructor({
    message, errors, stack, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic = false,
  }: any) {
    super({
      message,
      errors,
      status,
      isPublic,
      stack,
    });
  }
}
