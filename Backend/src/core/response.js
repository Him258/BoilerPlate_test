exports.sendSuccess = (res, message, data = {}, meta = null, statusCode = 200) => {
  const response = {
    success: true,
    message,
    data,
  };
  if (meta) response.meta = meta;
  return res.status(statusCode).json(response);
};

exports.sendError = (res, message, code = 'INTERNAL_ERROR', details = [], statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      details,
    },
  });
};
