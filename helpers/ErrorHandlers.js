class ErrorHandlers {
  badRequest(res, message = 'Bad Request') {
    let objectToSend = {};
    if (typeof message === 'string') {
      objectToSend.message = message;
    }
    if (
      typeof message === 'object' &&
      !Array.isArray(message) &&
      message !== null
    ) {
      objectToSend = message;
    }
    return res.status(400).json(objectToSend);
  }
  unauthorized(res, message = 'Unauthorized') {
    return res.status(401).json({ message });
  }
  forbidden(res, message = 'Forbidden') {
    return res.status(403).json({ message });
  }
  notFound(res, message = 'Resource Not Found') {
    return res.status(404).json({ message });
  }
  internalServer(err, req, res, next) {
    if (err) {
      console.error(err.stack);
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = new ErrorHandlers();
