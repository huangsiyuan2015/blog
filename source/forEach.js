const arr = [1, 2, 3, 4];

arr.forEach(function (value, index, array) {
  console.log(value, index, array, this);
}, {});

Array.prototype._forEach = function () {
  var arr = this;
  var callback = arguments[0];
  var context = arguments[1] || window;

  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }

  for (var i = 0; i < arr.length; i++) {
    callback.apply(context, [arr[i], i, arr]);
  }
};

arr._forEach(function (value, index, array) {
  console.log(value, index, array, this);
}, {});

// 注意：回调函数如果是箭头函数，那么不会改变 this 的指向
arr._forEach((value, index, array) => {
  console.log(value, index, array, this);
}, {});
