/**
 * `NoSignatureError` error.
 *
 * @api public
 */
function NoSignatureError(message) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'NoSignatureError';
  this.message = message || 'No signature found in XML document';
};

/**
 * Inherit from `Error`.
 */
NoSignatureError.prototype.__proto__ = Error.prototype;


/**
 * Expose `NoSignatureError`.
 */
module.exports = NoSignatureError;
