/* eslint-disable no-unused-vars */
const HttpStatusCodes = require('../constants/HttpStatusCodes');

const errorHandler = (err, req, res, next) => {
  const { INTERNAL_SERVER_ERROR } = HttpStatusCodes;
  const statusCode = res.statusCode ? res.statusCode : INTERNAL_SERVER_ERROR;

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err,
  });
};

module.exports = {
  errorHandler,
};
