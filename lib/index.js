/**
 * Module dependencies.
 */
var DOMParser = require('xmldom').DOMParser
  , xpath = require('xpath')
  , xcrypto = require('xml-crypto')
  , NoSignatureError = require('./errors/nosignatureerror')
  , ValidationError = require('./errors/validationerror');


exports.verify =
exports.validate = function(xml, sig, provider, cb) {
  if (typeof xml === 'string') {
    xml = new DOMParser().parseFromString(xml);
  }
  
  // TODO: Implement support for passing a signature directly, rather
  //       than an XPath query.
  var xsig = xpath.select(sig, xml)[0];
  if (!xsig) { return cb(new NoSignatureError()); }
  sig = xsig.toString();
  
  var verifier = new xcrypto.SignedXml();
  verifier.keyInfoProvider = provider;
  verifier.loadSignature(sig);
  var rv = verifier.checkSignature(xml.toString());
  if (!rv) { return cb(new ValidationError('Invalid XML signature', verifier.validationErrors)); }
  return cb(null, xml);
}
