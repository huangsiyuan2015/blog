function add(a, b, c) {
  return a + b + c;
}

console.log(add(1, 2, 3));
// console.log(add(1)(2)(3));

function curry() {
  var fn = arguments[0];
  var args = [].slice.call(arguments, 1);
  var length = fn.length; // fn 的形参个数

  var target = function () {
    args.push(...arguments);
    if (args.length < length) {
      return target;
    } else {
      return fn.apply(this, args);
    }
  };

  return target;
}

var addCurry = curry(add);
// console.log(addCurry(1)(2)(3));
// console.log(addCurry(1)(2, 3));
// console.log(addCurry(1, 2)(3));
// console.log(addCurry()()(1)(2)(3));

var oneAddCurry = curry(add, 1);
// console.log(oneAddCurry(2)(3));
console.log(oneAddCurry(2, 3));
