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

Generator 函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。
此外，它的两个特性使它可以作为异步编程的完整解决方案：函数体内外的数据交换和错误处理机制。

next 返回值的 value 属性，是 Generator 函数向外输出数据；next 方法还可以接受参数，向 Generator 函数体内输入数据。

```js
function* gen(x) {
  var y = yield x + 2
  return y
}

var it = gen(1)
it.next() // { value: 3, done: false }
it.next(2) // { value: 2, done: true }
```

Generator 函数内部还可以部署错误处理代码，捕获函数体外抛出的错误。

```js
function* gen(x) {
  try {
    var y = yield x + 2
  } catch (e) {
    console.log(e)
  }
  return y
}

var it = gen(1)
it.next() // { value: 3, done: false }
it.throw('error') // error
```

使用 Generator 函数封装一个异步操作：

```js
function* gen() {
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}

// 执行这个异步任务
let it = gen()
it.next().value
  .then(data => data.json())
  .then(data => it.next(data))
```

#### thunk 函数

```js
const fs = require('fs')

function readFileThunk(filename) {
  return function (callback) {
    fs.readFile(filename, callback)
  }
}

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

#### Promise

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

#### co 函数库

co 函数库是著名程序员 TJ 发布的一个小工具，用于处理 Generator 函数的自动执行。核心原理其实就是 thunk 函数和 Promise 对象进行配合，包装成一个库。

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

async/await 是 js 中异步终极解决方法，它是 co + generator 的语法糖。

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

async 函数对 Generator 函数的改进：

1. 内置执行器：Generator 函数的执行必须靠执行器，因为不能一次性执行完成，所以之后才有了开源的 co 函数库。但是，async 函数和正常的函数一样执行，也不用 co 函数库，也不用使用 next 方法，而 async 函数自带执行器，会自动执行。
2. 适用性更好：co 函数库有条件约束，yield 命令后面只能是 Thunk 函数或 Promise 对象，但是 async 函数的 await 关键词后面，可以不受约束。
3. 可读性更好：async 和 await，比起使用 * 号和 yield，语义更清晰明了。









