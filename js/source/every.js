const arr = [1, 2, 3, 4];

let result = arr.every(function (value, index, array) {
  console.log(value, index, array, this);
  return value % 2;
}, {});

console.log(result);

Array.prototype._every = function () {
  var arr = this;
  var callback = arguments[0];
  var context = arguments[1] || window;
  var result = true;

  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }

  for (var i = 0; i < arr.length; i++) {
    var flag = callback.apply(context, [arr[i], i, arr]);

    if (!flag) {
      result = false;
      break;
    }
  }

  return result;
};

result = arr._every(function (value, index, array) {
  console.log(value, index, array, this);
  return value % 2;
}, {});

console.log(result);
