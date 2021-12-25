const arr = [1, 2, 3, 4];

let result = arr.map(function (value, index, array) {
  console.log(value, index, array, this);
  return value * 2;
}, {});

console.log(result);

Array.prototype._map = function (callback, context = window) {
  const arr = this;
  const result = [];

  if (typeof callback === "function") {
    for (let i = 0; i < arr.length; i++) {
      result[i] = callback.apply(context, [arr[i], i, arr]);
    }
  } else {
    throw new TypeError(`${callback} is not a function`);
  }

  return result;
};

result = arr._map(function (value, index, array) {
  console.log(value, index, array, this);
  return value * 2;
}, {});

console.log(result);
