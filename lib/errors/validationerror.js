/**
 * `ValidationError` error.
 *
 * @api public
 */
function ValidationError(message, errs) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'ValidationError';
  this.message = message;
  this.validationErrors = errs;
};

/**
 * Inherit from `Error`.
 */
ValidationError.prototype.__proto__ = Error.prototype;


/**
 * Expose `ValidationError`.
 */
module.exports = ValidationError;
