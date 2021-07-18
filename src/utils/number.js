Number.prototype.fixedInt = function (length) {
  var t = this.toString(); var diff = length - t.length; if (diff >= 0) for (var i = 0; i < diff; i++) t = '0' + t; return t;
};

Number.prototype.FloatToString = function (factor) {
  if (!factor) factor = 1000; return (Math.floor(this * factor) / factor).toString();
};
