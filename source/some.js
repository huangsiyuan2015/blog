const arr = [1, 2, 3, 4];

let result = arr.some(function (value, index, array) {
  console.log(value, index, array, this);
  return !(value % 2);
}, {});

console.log(result);

Array.prototype._some = function () {
  var arr = this;
  var callback = arguments[0];
  var context = arguments[1] || window;
  var result = false;

  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }

  for (var i = 0; i < arr.length; i++) {
    var flag = callback.apply(context, [arr[i], i, arr]);

    if (flag) {
      result = true;
      break;
    }
  }

  return result;
};

result = arr._some(function (value, index, array) {
  console.log(value, index, array, this);
  return !(value % 2);
}, {});

console.log(result);
