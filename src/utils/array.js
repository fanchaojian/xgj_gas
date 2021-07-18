Array.prototype.remove = function (b) {
  var a = this.indexOf(b); if (a >= 0) { this.splice(a, 1); return this; } else return this;
};
Array.prototype.last = function () {
  if (this.length == 0) return null; else return this[this.length - 1];
};
Array.prototype.prepend = function (item) {
  this.splice(0, 0, item); return this;
};
Array.prototype.Distinct = function () {
  return this.filter((item, index, _this) => _this.indexOf(item) === index)
};
Array.prototype.max = function (property) {
  let r = null, ele = null;
  this.forEach((item, index) => {
    let c = (property ? item[property] : item); if (r === null) { r = c; ele = item; } else { if (c > r) { r = c; ele = item; } }
  });
  return { value: r, item: ele };
};
Array.prototype.min = function (property) {
  let r = null, ele = null;
  this.forEach((item, index) => {
    let c = (property ? item[property] : item); if (r === null) { r = c; ele = item; } else { if (c < r) { r = c; ele = item; } }
  });
  return { value: r, item: ele };
};
Array.prototype.Any = function (func) {
  this.forEach((item) => {
    if (func(item)) return true;
  });
  return false;
};
Array.prototype.All = function (func) {
  this.forEach((item) => {
    if (!func(item)) return false;
  });
  return true;
};

Array.prototype.NewItemOrderNo = function () {
  let orderNo = 1; if (this.length > 0) orderNo = this[this.length - 1].data.orderNo + 1;
  return orderNo;
}
Array.prototype.MakeNewItem = function (itemData) {
  return { data: itemData, old: {}, ui: { focus: false, unsaved: false, showMenu: false } };
}
Array.prototype.CreateNewItem = function (dataTemplate) {
  return this.MakeNewItem(Object.assign({ orderNo: this.NewItemOrderNo() }, dataTemplate));
}

