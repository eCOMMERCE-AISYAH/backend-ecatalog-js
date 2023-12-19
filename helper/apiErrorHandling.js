/**
 * Custom error class for handling API-specific errors.
 *
 * @class ApiErrorHandling
 * @extends {Error}
 * @param {number} statusCode - HTTP status code associated with the error.
 * @param {string} message - Custom error message describing the issue.
 */
class ApiErrorHanding extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

exports = ApiErrorHanding;
