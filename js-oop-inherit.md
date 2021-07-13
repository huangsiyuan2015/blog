## 继承

### 组合继承

组合继承是最常用的继承方式。

```js
function Parent(value) {
  this.val = value
}

Parent.prototype.getValue = function () {
  console.log(this.val)
}

function Child(value) {
  Parent.call(this, value)
}

Child.prototype = new Parent()

const child = new Child(1)
child instanceof Parent // true
```

组合继承的关键在于子类的构造函数中通过 `Parent.call(this)` 继承父类的属性，然后修改子类的原型为 `new Parent()` 继承父类的方法。
缺点是子类的原型上多了不需要的父类属性。

### 寄生组合继承

寄生组合继承对组合继承进行了优化，优化掉了不需要的父类属性。

```js
function Parent(value) {
  this.val = value
}

Parent.prototype.getValue = function () {
  console.log(this.val)
}

function Child(value) {
  Parent.call(this, value)
}

Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    writable: true,
    enumerable: false,
    configurable: true
  }
})

const child = new Child(1)
child instanceof Parent // true
```

寄生组合继承的关键在于将父类的原型赋值给了子类，并且将构造函数设置为子类，解决了无用的父类属性问题，还能正确找到子类的构造函数。

### class 继承

es6 新增了 `class` 关键字，用来实现继承。

```js
class Parent {
  constructor(value) {
    this.val = value
  }
  
  getValue() {
    console.log(this.val)
  }
}

class Child extends Parent {
  constructor(value) {
    super(value)
  }
}

const child = new Child(1)
child instanceof Parent // true
```

`class` 实现继承的关键在于子类构造函数中必须调用 `super(value)`，相当于 `Parent.call(this, value)`。
然而 js 中并不存在类，`class` 的本质还是函数。

```js
class Person {}
Person instanceof Function // true
```

