const arr = [1, 2, 3, 4];

let result = arr.reduce(function (pre, cur, index, array) {
  console.log(pre, cur, index, array);
  return pre + cur;
}, 0);

console.log(result);

Array.prototype._reduce = function () {
  var arr = this;
  var callback = arguments[0];
  var initValue = arguments[1];
  var acc, i;

  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }

  // 注意：0 和 空串也是合法的初始值
  if (initValue || initValue === 0 || initValue === "") {
    acc = initValue;
    i = 0;
  } else {
    acc = arr[0];
    i = 1;
  }

  for (; i < arr.length; i++) {
    acc = callback(acc, arr[i], i, arr);
  }

  return acc;
};

result = arr._reduce(function (pre, cur, index, array) {
  console.log(pre, cur, index, array);
  return pre + cur;
}, 0);

console.log(result);
