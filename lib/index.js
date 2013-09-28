/**
 * Module dependencies.
 */
var DOMParser = require('xmldom').DOMParser
  , xcrypto = require('xml-crypto')
  , BufferKeyInfoProvider = require('./bufferkeyinfoprovider')
  , ValidationError = require('./errors/validationerror');


exports.verify =
exports.validate = function(xml, sig, key, cb) {
  if (typeof xml === 'string') {
    xml = new DOMParser().parseFromString(xml);
  }
  
  var verifier = new xcrypto.SignedXml();
  verifier.keyInfoProvider = new BufferKeyInfoProvider(key);
  verifier.loadSignature(sig.toString());
  var rv = verifier.checkSignature(xml.toString());
  if (!rv) { return cb(new ValidationError('Invalid XML signature', verifier.validationErrors)); }
  return cb(null, xml);
}
