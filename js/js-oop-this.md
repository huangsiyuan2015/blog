## this 关键字

this 表示函数的运行环境(context)，只有在函数**运行时**才能确定；箭头函数没有自己的 this，箭头函数在**声明时**继承外部的 this。

函数名是一个地址引用，可以作为不同对象的属性，即在不同的运行环境中执行，为了在函数体内部获得当前的运行环境，设计出了 this。

```js
var x = 1
const fn = function () {
  // 引用当前环境的其它变量，即全局作用域下的 x
  // console.log(x)
  // 等价于
  console.log(this.x)
}
fn() // 1, 在全局环境(window)下运行

const o1 = {
  x: 2,
  fn // 函数名是一个引用，可以作为不同对象的属性
}
const o2 = {
  x: 3,
  fn // 函数名是一个引用，可以作为不同对象的属性
}
o1.fn() // 2, 在 o1 环境下运行
o2.fn() // 3, 在 o2 环境下运行
```

## this 使用场景

this 的使用场景主要有以下几个：

1. 全局环境（callback）
2. 对象的方法（obj.fn()）
3. 构造函数（new Fn()）

### 全局环境

函数在全局环境下调用，函数中的 this 指向 window。注意，**回调函数**默认都是在全局环境下运行。

```js
function fn() {
  console.log(this)
}
// 单独调用
fn() // window

function exec(callback) {
  callback()
}
// 回调函数
exec(fn) // window
```

### 对象的方法

函数作为对象的方法，函数中的 this 指向函数**运行时**所在的对象。

```js
function fn() {
  console.log(this)
}

const o1 = {
  foo: 'hello', fn
}
o1.fn() // {foo: 'hello', fn: function fn()}

const o2 = {
  foo: 'hello',
  bar: {
    // 普通函数中的 this 只指向当前层的对象，不会继承更上层的对象
    baz: 'world', fn
  }
}
o2.bar.fn() // {baz: 'world', fn: function fn()}

const o3 = {
  foo: 'hello',
  bar: {
    // 箭头函数中的 this 继承自外层，但注意对象不形成作用域，所以继承自最外层的 window
    baz: 'world', fn: () => console.log(this)
  }
}
o3.bar.fn() // window
```

### 构造函数

new 一个构造函数的时候，构造函数中的 this 指向**实例对象**。

```js
function Person() {
  console.log(this)
  console.log(this instanceof Person)
}

new Person()
// {}
// true
```

> 面试题：如何判断 this 的指向？箭头函数的 this 是什么？

函数中的 this 在函数**运行时**才能确定；箭头函数没有自己的 this，箭头函数在**声明时**继承外部作用域的 this。

## this 绑定

js 提供了3种修改 this 指向的方法：

1. Function.prototype.call(thisArg[, arg1[, arg2[, ...]]])
2. Function.prototype.apply(thisArg, argsArray)
3. Function.prototype.bind(thisArg[, arg1[, arg2[, ...]]])

### call() & apply()

用法：

```js
function fn(name, age) {
  console.log(this, name, age)
}

fn('ace', 18) // window 'ace' 18
fn.call({}, 'ace', 18) // {} 'ace' 18
fn.apply({}, ['ace', 18]) // {} 'ace' 18
```

> 面试题：请实现一个 call/apply 函数。

实现思路：将传进去的对象作为函数的运行环境调用该函数，形如：obj.fn()

1. 如果不传对象或传递 null/undefined，则对象默认为 window
2. 在对象上添加一个临时属性，将属性值设置为该函数
3. 在对象上调用该函数
4. 删除临时属性
5. 返回函数调用的结果

```js
// call 方法实现
Function.prototype._call = function (context, ...args) {
  // 如果传递的对象为空，则默认为 window
  context = context || window

  // 创建 symbol 类型的临时属性指向函数本身
  let sym = Symbol('fn')
  context[sym] = this
  
  // 在该对象中调用该函数
  let result = context[sym](...args)
  
  // 函数调用完后删掉临时属性
  delete context[sym]
  return result
}
```

```js
// apply 方法实现和 call 类似，区别是传递的参数是数组
Function.prototype._apply = function (context, args) {
  // 第二个参数不是数组类型直接报错
  if (!Array.isArray(args))
    throw new TypeError('second argument to Function.prototype.apply must be an array')
  
  // 同 call 方法的实现
  context = context || window

  let sym = Symbol('fn')
  context[sym] = this

  let result = context[sym](...args)
  delete context[sym]
  return result
}
```

### bind()

用法：

```js
function fn(name, age) {
  console.log(this, name, age)
}

fn('ace', 18) // window 'ace' 18
fn.bind({})('ace', 18) // {} 'ace' 18
fn.bind({}, 'ace')(18) // {} 'ace' 18
```

> 面试题：请实现一个 bind 函数。

实现思路：返回一个函数包裹着函数调用，函数调用使用 apply 方法

1. 返回**绑定后**的函数分为两种：不支持 new 运算符，支持 new 运算符

```js
// 不支持 new 运算符
Function.prototype._bind = function (context, ...argsBound) {
  const self = this
  return function (...args) {
    return self.apply(context, argsBound.concat(args))
  }
}

// 支持 new 运算符，要忽略绑定时的对象
Function.prototype._bind = function (context, ...argsBound) {
  const self = this
  
  const fnBound = function (...args) {
    // 如果使用了 new，即 new fnBound()，this 就是 fnBound 函数的实例
    // self 作为构造函数，如果 self.apply(this) 没有返回值，那么此时返回的就是构造后的 this（new 运算符的原理）
    // self 作为普通函数，直接返回 self.apply(context) 的调用结果
    return self.apply(this instanceof fnBound ? this : context, argsBound.concat(args))
  }
  
  // 如果该函数有原型，被绑定函数继承该函数的原型
  if (this.prototype)
    fnBound.prototype = Object.create(this.prototype)

  return fnBound
}
```

> 面试题：一个函数多次 bind 后的 this 指向，请回答下面代码的输出。

```js
let fn = function () { return this }
fn.bind({}).bind({foo: 'hello'}).bind({bar: 'world'})() // {}

// 等价于
function () {
  return function () {
    return function () {
      return fn.apply({})
    }.apply({foo: 'hello'})
  }.apply({bar: 'world'})
}()
// 结论：一个函数无论 bind 几次，函数中的 this 只由第一次的 bind 决定
```

