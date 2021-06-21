## new 运算符

`new` 运算符的原理：

1. 创建一个空对象，作为将要返回的实例对象
2. 将这个空对象的原型**指向**构造函数的 `prototype` 属性
3. 将空对象传递给构造函数内部的 `this` 关键字
4. 执行构造函数内部的代码
   1. 如果构造函数有 `return` 语句，并且返回一个对象，那么 `new` 运算符会返回 `return` 指定的对象
   2. 如果构造函数没有 `return` 语句或者 `return` 一个非对象类型，那么会忽略直接返回 `this` 对象

```js
function Person(name) {
  this.name = name
}
new Person('ace') // {name: 'ace'}

function Person(name) {
  this.name = name
  return {foo: 'hello'}
}
new Person('ace') // {foo: 'hello'}

function Person(name) {
  this.name = name
  return 'hello'
}
new Person('ace') // {name: 'ace'}
```

注意：

1. 如果构造函数返回 `null` 也会被忽略，返回**函数**或者其它内置对象不会被忽略

```js
// 返回 null
function Person(name) {
  this.name = name
  return null
}
new Person('ace') // {name: 'ace'}

// 返回 function
function Person(name) {
  this.name = name
  return function func() {}
}
new Person('ace') // function func() {}
```

2. 构造函数 `prototype` 属性的修改会立刻反应在实例对象的原型上，所以实例对象的原型只是一个引用

```js
function Person(name) {
  this.name = name
}
const p = new Person('ace')

Person.prototype === p.__proto__ // true
Person.prototype === Object.getPrototypeOf(p) // true

// 修改构造函数的 prototype 属性
Person.prototype.age = 27
p.age // 27

// 修改实例对象的 proto 属性
p.__proto__.job = 'frontend'
Person.prototype.job // 'frontend'
```

> 面试题：`new` 运算符具体做了什么？请实现一个 `new` 运算符。

```js
function _new(func, ...args) {
  // 创建一个空对象，空对象的原型指向构造函数的 prototype 属性
  const obj = Object.create(func.prototype)
  // const obj = Object.setPrototypeOf({}, func.prototype)
  // 将空对象传递给构造函数中的 this，执行构造函数内部的代码
  const instance = func.apply(obj, args)
  // 如果构造函数的返回值是对象，则返回指定对象，否则返回 this 对象
  return (typeof instance === 'object' && instance !== null) ? instance : obj
}

function Person(name) { this.name = name }
const p1 = new Person('ace') // {name: 'ace'}
const p2 = _new(Person, 'ace') // {name: 'ace'}
```

> 面试题：回答下面代码输出。

```js
function Page() {
  return this.hosts
}
Page.hosts = ['h1']
Page.prototype.hosts = ['h2']

const p1 = new Page() // ['h2']
const p2 = Page() // undefined

console.log(p1.hosts) // undefined
console.log(p2.hosts) // Uncaught TypeError: can't access property "hosts", p2 is undefined
```

