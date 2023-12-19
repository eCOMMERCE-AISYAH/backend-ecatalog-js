/**
 * Generates a standardized error response for API requests.
 *
 * @param {object} res - Express response object.
 * @param {number} statusCode - HTTP status code to be sent in the response.
 * @param {string} message - Custom error message to be included in the response.
 * @returns {object} - JSON response with status code and error message.
 */

function responseError(res, statusCode, message) {
  return res.status(statusCode).json({
    status: statusCode,
    message,
  });
}

export default responseError;