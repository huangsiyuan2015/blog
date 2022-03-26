function fn() {
  console.log(Array.prototype.slice.call(arguments), this);
}

// 偏函数特性
fn.bind({}, 1, 2)();
fn.bind({}, 1)(2);
fn.bind({})(1, 2);

// 没有丢失原型
function Person() {}
Person.prototype.say = function () {
  console.log("hello");
};

// 注意：bind() 返回的函数没有 prototype 属性
const PersonBound = Person.bind({});
// console.log(PersonBound.prototype); // undefined

// 即使为 bind() 返回的函数添加 prototype 属性
// 实例的原型依然是 bind 前的函数的 prototype 属性
// PersonBound.prototype = {};
// PersonBound.prototype.speak = function () {
//   console.log("english");
// };
const person = new PersonBound();
person.say(); // 'hello'
// person.speak(); // error: speak is not a function

Function.prototype._bind = function () {
  var fn = this;
  var ctx = arguments[0] || window;
  var args = Array.prototype.slice.call(arguments, 1);

  if (ctx === null || ctx === undefined) {
    ctx = window;
  }

  if (ctx !== "object") {
    ctx = Object(ctx);
  }

  var target = function () {
    var innerArgs = Array.prototype.slice.call(arguments);
    return fn.apply(ctx, args.concat(innerArgs));
  };

  // 注意：不要直接 new fn()，因为 new fn() 会执行 fn 函数
  // 将 fn 的 prototype 传给 f，然后 new f() 就继承了 fn 的 prototype
  var f = function () {};
  f.prototype = fn.prototype;
  target.prototype = new f();

  return target;
};

fn._bind({}, 1, 2)();
fn._bind({}, 1)(2);
fn._bind({})(1, 2);

const _PersonBound = Person._bind({});
const _person = new _PersonBound();
_person.say();
