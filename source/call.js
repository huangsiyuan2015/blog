function fn() {
  console.log(this, Array.prototype.slice.call(arguments));
}

// fn(1, 2);
fn.call({}, 1, 2);

Function.prototype._call = function () {
  var ctx = arguments[0];
  var args = [];

  if (ctx === undefined || ctx === null) {
    ctx = window;
  }

  if (typeof ctx !== "object") {
    ctx = Object(ctx);
  }

  for (var i = 1, j = 0; i < arguments.length; i++) {
    args[j++] = arguments[i];
  }

  // 使用毫秒数模拟唯一的键
  var key = Date.now();
  ctx[key] = this;

  // 使用 eval 将数组转为参数列表
  var res = eval("ctx[key](" + args + ")");
  delete ctx[key];

  return res;
};

fn._call({}, 1, 2);
