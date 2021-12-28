Object.prototype._instanceof = function () {
  var instance = this;
  var constructor = arguments[0];

  var proto = Object.getPrototypeOf(instance);
  while (proto) {
    if (proto === constructor.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
};

class Parent {}
class Child extends Parent {}

const child = new Child();
console.log(child instanceof Child);
console.log(child instanceof Parent);
console.log(child._instanceof(Child));
console.log(child._instanceof(Parent));
console.log(child._instanceof(Object));
console.log(child._instanceof(Array));
