/**
 * Module dependencies.
 */
var DOMParser = require('xmldom').DOMParser
  , xcrypto = require('xml-crypto')
  , BufferKeyInfoProvider = require('./bufferkeyinfoprovider')
  , ValidationError = require('./errors/validationerror');


exports.sign = function(xml) {
  // TODO: Clean this up...
  var signer = new xcrypto.SignedXml();
  signer.addReference("//*[local-name(.)='Assertion']",
                  ["http://www.w3.org/2000/09/xmldsig#enveloped-signature", "http://www.w3.org/2001/10/xml-exc-c14n#"],
                  'http://www.w3.org/2000/09/xmldsig#sha1');
  signer.signatureAlgorithm = 'http://www.w3.org/2000/09/xmldsig#hmac-sha1';
  signer.signingKey = 'foo';
  signer.computeSignature(xml);
  return signer.getSignedXml();
}

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
