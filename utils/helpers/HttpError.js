const httpErrorMessage = require("../../constants/httpErrorMessage");

class HttpError extends Error {
  constructor(
    statusCode = 500,
    message = httpErrorMessage[statusCode] || httpErrorMessage.default
  ) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = HttpError;
