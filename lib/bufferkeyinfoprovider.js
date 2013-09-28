function BufferKeyInfoProvider(data) {
  this.data = data;
}

BufferKeyInfoProvider.prototype.getKeyInfo = function(key) {
  return "<X509Data></X509Data>";
}

BufferKeyInfoProvider.prototype.getKey = function(keyInfo) {
  return this.data;
}


module.exports = BufferKeyInfoProvider;
