const arr = [1, 2, 3, 4];

let result = arr.filter(function (value, index, array) {
  console.log(value, index, array, this);
  return value % 2;
}, {});

console.log(result);

Array.prototype._filter = function () {
  var arr = this;
  var callback = arguments[0];
  var context = arguments[1] || window;
  var result = [];

  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }

  for (var i = 0, j = 0; i < arr.length; i++) {
    callback.apply(context, [arr[i], i, arr]) && (result[j++] = arr[i]);
  }

  return result;
};

result = arr._filter(function (value, index, array) {
  console.log(value, index, array, this);
  return value % 2;
}, {});

console.log(result);
