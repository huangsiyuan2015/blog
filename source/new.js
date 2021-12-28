function Person(name, age) {
  this.name = name;
  this.age = age;
  // return null;
  // return () => {};
}

let person = new Person("ace", 12);
console.log(person);

Function.prototype.new = function () {
  var constructor = this;
  var args = Array.prototype.slice.call(arguments);

  // Object.create() 是 es5 语法
  var ctx = Object.create(constructor.prototype);

  // Object.setPrototypeOf() 是 es6 语法
  // var ctx = Object.setPrototypeOf({}, constructor.prototype);

  // var f = function () {};
  // f.prototype = constructor.prototype;
  // var ctx = new f();

  var res = constructor.apply(ctx, args);
  var isObj =
    (typeof res === "object" && res !== null) || typeof res === "function";

  return isObj ? res : ctx;
};

person = Person.new("ace", 12);
console.log(person);
