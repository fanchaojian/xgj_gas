String.prototype.UpFirst = function () {
  if (this.length < 1) return this; return this[0].toUpperCase() + this.substr(1);
}
String.prototype.GetRouteFromUrl = function () {
  let url = this, index = url.indexOf("//"); if (index > -1) url = url.substr(index + 2); index = url.indexOf('/');
  if (index > -1) url = url.substr(index + 1); index = url.indexOf('?'); if (index > -1) url = url.substr(0, index);
  return '/' + url;
}

String.prototype.Trim = function (target) {
  if (!target) return; let r = this, c = target.length; if (c < 1) return this;
  let index = r.indexOf(target);
  while (index === 0) { r = r.substr(c); index = r.indexOf(target); }
  index = r.lastIndexOf(target);
  while (index === r.length - c && index > -1) { r = r.substr(0, index); index = r.lastIndexOf(target); }
  return r;
}


String.prototype.ToString = function () {
  return this;
}


