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

1. 全局环境（回调函数）
2. 对象的方法
3. 构造函数

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

new Person() // {} true
```

> 面试题：如何判断 this 的指向？箭头函数的 this 是什么？

函数中的 this 在函数**运行时**才能确定，箭头函数没有自己的 this，箭头函数在**声明时**继承外部作用域的 this。

## this 绑定

js 提供了绑定 this 的3种方法：

1. Function.prototype.call(thisArg, arg1, arg2, ...)
2. Function.prototype.apply(thisArg, argsArray)
3. Function.prototype.bind(thisArg[, arg1[, arg2[, ...]]])

### call() & apply()

call 方法用于指定函数内部的 this 指向，然后在指定的作用域中调用该函数。

apply 方法和 call 方法类似，区别是 apply 方法以数组的形式接收函数的参数。

```js
function fn(name, age) {
  console.log(this)
  console.log(name, age)
}

fn('ace', 13) // window 'ace' 13
fn.call({}, 'luffy', 12) // {} 'luffy' 12
fn.apply({}, ['sabo', 13]) // {} 'sabo' 13
```

> 面试题：请实现一个 call/apply 函数。

```js
Function.prototype._call = function (context, ...args) {
  context = context || window
  context.fn = this
  const result = context.fn(...args)
  delete context.fn
  return result
}

Function.prototype._apply = function (context, args = []) {
  context = context || window
  context.fn = this
  const result = context.fn(...args)
  delete context.fn
  return result
}
```

### bind()

bind 方法用于将函数体内部的 this 绑定到某个对象，然后返回一个新函数。

```js
function fn(name, age) {
  console.log(this)
  console.log(name, age)
}

fn('ace', 13) // window 'ace' 13
fn.bind({})('luffy', 12) // {} 'luffy' 12
fn.bind({}, 'sabo')(13) // {} 'sabo' 13
```

> 面试题：请实现一个 bind 函数。

```js
// 不支持 new fnBound
Function.prototype._bind = function (context, ...args) {
  const self = this
  return function (...argsBound) {
    return self.apply(context, args.concat(argsBound))
  }
}

// 支持 new fnBound
Function.prototype._bind = function (context, ...args) {
  const self = this
  const fnBound = function (...argsBound) {
    return self.apply(this instanceof fnBound ? this : context, args.concat(argsBound))
  }
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