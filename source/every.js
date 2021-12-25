const arr = [1, 2, 3, 4];

let result = arr.every(function (value, index, array) {
  console.log(value, index, array, this);
  return value % 2;
}, {});

console.log(result);

Array.prototype._every = function (callback, context = window) {
  const arr = this;
  let result = true;

  if (typeof callback === "function") {
    for (let i = 0; i < arr.length; i++) {
      if (!callback.apply(context, [arr[i], i, arr])) {
        result = false;
        break;
      }
    }
  } else {
    throw new TypeError(`${callback} is not a function`);
  }

  return result;
};

result = arr._every(function (value, index, array) {
  console.log(value, index, array, this);
  return value % 2;
}, {});

console.log(result);
