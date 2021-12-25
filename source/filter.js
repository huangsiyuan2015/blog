const arr = [1, 2, 3, 4];

let result = arr.filter(function (value, index, array) {
  console.log(value, index, array, this);
  return value % 2;
}, {});

console.log(result);

Array.prototype._filter = function (callback, context = window) {
  const arr = this;
  const result = [];

  if (typeof callback === "function") {
    for (let i = 0; i < arr.length; i++) {
      callback.apply(context, [arr[i], i, arr]) && result.push(arr[i]);
    }
  } else {
    throw new TypeError(`${callback} is not a function`);
  }

  return result;
};

result = arr._filter(function (value, index, array) {
  console.log(value, index, array, this);
  return value % 2;
}, {});

console.log(result);
