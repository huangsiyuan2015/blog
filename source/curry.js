function curry(fn, ...args) {
  return args.length >= fn.length
    ? fn(...args)
    : (...innerArgs) => curry(fn, ...args, ...innerArgs);
}

function add(a, b, c) {
  return a + b + c;
}

var addCurry = curry(add);
// console.log(addCurry(1)(2)(3));
// console.log(addCurry(1)(2, 3));
// console.log(addCurry(1, 2)(3));

oneAddCurry = curry(add, 1);
// console.log(oneAddCurry(2)(3));
console.log(oneAddCurry(2, 3));

// 可以直接使用箭头函数实现 add(1)(2)(3)
// 缺陷：不能随意传递参数的个数，参数只能一个一个的传
var add = (x) => (y) => (z) => x + y + z;
console.log(add(1)(2)(3));
