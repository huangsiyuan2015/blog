const arr = [1, 2, 3, 4];

let result = arr.map(function (value, index, array) {
  console.log(value, index, array, this);
  return value * 2;
}, {});

console.log(result);

Array.prototype._map = function () {
  var arr = this;
  var args = Array.prototype.slice.call(arguments);
  var callback = args[0];
  var context = args[1] || window;
  var result = [];

  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }

  for (var i = 0; i < arr.length; i++) {
    result[i] = callback.apply(context, [arr[i], i, arr]);
  }

  return result;
};

result = arr._map(function (value, index, array) {
  console.log(value, index, array, this);
  return value * 2;
}, {});

console.log(result);
