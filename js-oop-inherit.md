## 原型

### 原型链

## 继承

js 是基于**原型**继承的，即使 es6 新增了 class 关键字，本质上还是基于原型来实现继承。

js 中继承的几种方式：

1. 原型链继承
2. 构造函数继承
3. *组合继承
4. 原型式继承
5. 寄生式继承
6. *寄生组合继承
7. *es6 的 extends

### 原型链继承

原型链继承涉及构造函数、原型对象和实例对象，通常情况下，每个构造函数都有一个原型对象(prototype)，原型对象又包含一个指向构造函数的指针(constructor)，实例对象包含一个指向原型对象的指针(proto)。

```js
function Parent() {
  this.name = 'parent'
  this.play = [1, 2, 3]
}

function Child() {
  this.type = 'child'
}

Child.prototype = new Parent() // 将父类的实例对象设置为子类的原型对象，通过原型链继承父类的所有属性

let child1 = new Child()
let child2 = new Child()
child1.play.push('a')
child1.play // [1, 2, 3, 'a']
child2.play // [1, 2, 3, 'a']
// 缺陷：子类的多个实例对象共享同一个原型对象，当某一个实例对象修改了原型对象，会影响其它的实例对象
```

### 构造函数继承

构造函数继承是在子类构造函数中通过 call() 调用父类构造函数，从而继承父类的属性。

```js
function Parent() {
  this.name = 'parent'
  this.play = [1, 2, 3]
}

Parent.prototype.getName = function () {
  return this.name
}

function Child() {
  Parent.call(this) // 在子类构造函数中通过 call() 调用父类构造函数，继承父类的实例属性
  this.type = 'child'
}

let child1 = new Child()
let child2 = new Child()
child1.play.push('a')
child1.play // [1, 2, 3, 'a']
child2.play // [1, 2, 3]

child1.getName // undefined
child2.getName // undefined
// 缺陷：只能继承父类的实例属性，无法继承父类原型上的属性
```

### *组合继承

组合继承是将原型链继承和构造函数继承进行组合，进而弥补两者的缺陷。

```js
function Parent() {
  this.name = 'parent'
  this.play = [1, 2, 3]
}

Parent.prototype.getName = function () {
  return this.name
}

function Child() {
  Parent.call(this) // 在子类构造函数中通过 call() 调用父类构造函数，继承父类的实例属性
  this.type = 'child'
}

Child.prototype = new Parent() // 将父类的实例对象设置为子类的原型对象，通过原型链继承父类的所有属性
Child.prototype.constructor = Child // 因为修改了构造函数 Child 的原型对象，需要设置 constructor 属性指向自身

let child1 = new Child()
let child2 = new Child()
child1.play.push('a')
child1.play // [1, 2, 3, 'a']
child2.play // [1, 2, 3]

child1.getName() // 'parent'
child2.getName() // 'parent'
// 缺陷：调用了两次父类构造函数：Parent.call()、new Parent()，父类的实例属性被继承了两次，增加了不必要的内存开销
```

### 原型式继承

通常都是通过 new 构造函数的形式创建实例对象，从而继承构造函数的原型对象(prototype)上的属性（参考 new 运算符）。

原型式继承是在缺少构造函数的情况下，使用 Object.create() 方法直接将一个对象作为原型对象继承，进而创建一个新对象。

```js
let parent = {
  name: 'parent',
  play: [1, 2, 3],
  getName() {
    return this.name
  }
}

let person1 = Object.create(parent)
person1.name = 'ace'
person1.play.push('sabo')

let person2 = Object.create(parent)
person2.play.push('luffy')

person1.name // 'ace'
person1.getName() // 'ace'
person2.name // 'parent'
person2.getName() // 'parent'
person1.play // [ 1, 2, 3, "sabo", "luffy" ]
person2.play // [ 1, 2, 3, "sabo", "luffy" ]
// 缺陷：和原型链继承一样，多个实例对象指向同一个原型对象，存在篡改原型对象的可能
```

### 寄生式继承

寄生式继承是在原型式继承的基础上，添加更多的属性和方法，因为在继承原型对象的基础上进行添加，所以被称为"寄生"。

```js
let parent = {
  name: 'parent',
  play: [1, 2, 3],
  getName() {
    return this.name
  }
}

let person = Object.create(parent)
person.getFriend = function () {
  return this.play
}

person.name // 'parent'
person.getName() // 'parent'
person.getFriend() // [ 1, 2, 3 ]
// 缺陷：和原型式继承一样，多个实例对象指向同一个原型对象，存在篡改原型对象的可能
```

### *寄生组合继承

寄生组合继承是对组合继承进行了优化，结合寄生式继承，避免父类的实例属性被继承两次。

```js
function Parent() {
  this.name = 'parent'
  this.play = [1, 2, 3]
}

Parent.prototype.getName = function () {
  return this.name
}

function Child() {
  Parent.call(this) // 在子类构造函数中通过 call() 调用父类构造函数，继承父类的实例属性
  this.type = 'child'
}

// Child.prototype = new Parent() // 将父类的实例对象设置为子类的原型对象，通过原型链继承父类的所有属性
Child.prototype = Object.create(Parent.prototype) // 将父类的原型对象为原型创建一个空对象，避免再次继承父类的实例属性
Child.prototype.constructor = Child // 因为修改了构造函数 Child 的原型对象，需要设置 constructor 属性指向自身

Child.prototype.getFriend = function () {
  return this.play
}

let child1 = new Child()
let child2 = new Child()
child1.play.push('a')
child1.play // [1, 2, 3, 'a']
child2.play // [1, 2, 3]

child1.getName() // 'parent'
child2.getName() // 'parent'
// 优点：只调用了一次父类构造函数：Parent.call()，避免了父类的实例属性被继承两次，减少不必要的内存开销
```

### *extends 继承

es6 新增了 class、extends 关键字，用来模拟基于类的继承，但本质上还是基于原型的寄生组合继承。

```js
class Parent {
  constructor() {
    this.name = 'parent'
    this.play = [1, 2, 3]
  }
  
  // 原型方法，即 Parent.prototype.getName
  getName() {
    return this.name
  }
}

class Child extends Parent {
  constructor() {
    super() // 相当于 Parent.call(this)
    this.type = 'child'
  }

  // 原型方法，即 Child.prototype.getFriend
  getFriend() {
    return this.play
  }
}

let child1 = new Child()
let child2 = new Child()
child1.play.push('a')
child1.play // [1, 2, 3, 'a']
child2.play // [1, 2, 3]

child1.getName() // 'parent'
child2.getName() // 'parent'
```

可以使用 babel 将 es6 编译成 es5，查看 extends 的底层实现使用的还是寄生组合继承。

```js
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(
    superClass && superClass.prototype,
    {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });

  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {

  _setPrototypeOf = Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

  return _setPrototypeOf(o, p);
}
```

