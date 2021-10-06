## 异步编程

js 中的异步编程模型有：

1. callback
2. promise
3. generator
4. async/await
5. timer
   1. setTimeout
   2. setInterval
   3. requestAnimationFrame

### Generator

Generator 函数返回一个迭代器，迭代器每执行一次 next 方法，Generator 函数会执行到下一个 yield 关键字的位置。

```js
function* gen() {
  let a = yield 1
  let b = yield (function () { return 2 })()
  return 3
}

let it = gen() // 返回一个迭代器
console.log(it.next()) // { value: 1, done: false }
console.log(it.next()) // { value: 2, done: false }
console.log(it.next()) // { value: 3, done: true }
console.log(it.next()) // { value: undefined, done: true }
```

Generator 函数之间可以配合 yield 关键字相互调用：

```js
function* gen1() {
  yield 1
  yield* gen2()
  yield 4
}

function* gen2() {
  yield 2
  yield 3
}

let it = gen1()
console.log(it.next()) // { value: 1, done: false }
console.log(it.next()) // { value: 2, done: false }
console.log(it.next()) // { value: 3, done: false }
console.log(it.next()) // { value: 4, done: false }
console.log(it.next()) // { value: undefined, done: true }
```

迭代器的 next 方法还可以向 Generator 函数内部传递数据：

```js
function* gen() {
  let a = yield 1
  console.log(a)
  let b = yield 2
  console.log(b)
  return 3
}

let it = gen()
console.log(it.next()) // { value: 1, done: false }
console.log(it.next('hello'))
// hello
// { value: 2, done: false }
console.log(it.next('world'))
// world
// { value: 3, done: true }
console.log(it.next()) // { value: undefined, done: true }
```

#### thunk 函数

thunk 函数通过接收一定的参数，产生出定制化的函数，最后使用定制化的函数去完成想要实现的功能。

```js
// 判断某种数据类型通常的写法
let isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

let isArray = (arr) => {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

// 判断其它类型，需要重复写同样的判断逻辑
// 通过封装，定制化产生判断指定类型的函数
let isType = (type) => {
  return (val) => {
    return Object.prototype.toString.call(val) === `[object ${type}]`
  }
}

let isObject = isType('Object')
isObject({}) // true

let isArray = isType('Array')
isArray([]) // true
// isType 就叫作 thunk 函数
```

#### Generator + thunk(callback)

genarator 函数和 thunk 函数结合，可以使得异步代码写起来像同步代码一样。

```js
const fs = require('fs')

function readFileThunk(filename) {
  return function (callback) {
    fs.readFile(filename, callback)
  }
}

// 除了 yield 关键字，其它都和同步代码一样
function* gen() {
  const data1 = yield readFileThunk('1.txt')
  console.log(data1.toString())
  const data2 = yield readFileThunk('2.txt')
  console.log(data2.toString())
}

let it = gen()
// 产生了多层嵌套，每次传递的都是回调函数
it.next().value((err, data1) => {
  it.next(data1).value((err, data2) => {
    it.next(data2)
  })
})

// 改写为递归调用，满足程序的自动执行
function run(gen) {
  let it = gen()
  
  function next(err, data) {
    let result = it.next(data)
    if (result.done) return
    result.value(next)
  }
  
  next()
}
run(gen)
// hello
// world
```

#### Generator + thunk(promise)

```js
const fs = require('fs')

function readFileThunk(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

// 除了 yield 关键字，其它都和同步代码一样
function* gen() {
  const data1 = yield readFileThunk('1.txt')
  console.log(data1.toString())
  const data2 = yield readFileThunk('2.txt')
  console.log(data2.toString())
}

let it = gen()
// 产生了多层嵌套，每次传递的都是回调函数
it.next().value.then(data => {
  it.next(data).value.then(data => {
    it.next(data)
  })
})

// 改写为递归调用，满足程序的自动执行
function run(gen) {
  let it = gen()
  
  function next(data) {
    let result = it.next(data)
    if (result.done) return
    result.value.then(next)
  }
  
  next()
}
run(gen)
// hello
// world
```

#### Generator + co

co 函数库是著名程序员 TJ 发布的一个小工具，用于处理 Generator 函数的自动执行。核心原理其实就是 thunk 函数和 Promise 对象进行配合。

```js
const fs = require('fs')
const co = require('co')

function readFileThunk(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

function* gen() {
  const data1 = yield readFileThunk('1.txt')
  console.log(data1.toString())
  const data2 = yield readFileThunk('2.txt')
  console.log(data2.toString())
}

co(gen)
// hello
// world
```

### async/await

async/await 是 js 异步终极解决方法，本质上是 Generator + co 的语法糖，async 函数总是返回一个 promise。

```js
const fs = require('fs')

function readFileThunk(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

// 将 * 改为了 async，yield 改为了 await
async function gen() {
  const data1 = await readFileThunk('1.txt')
  console.log(data1.toString())
  const data2 = await readFileThunk('2.txt')
  console.log(data2.toString())
}

gen()
// hello
// world
```

