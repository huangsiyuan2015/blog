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

### callback

早期的异步编程方案就是回调函数：

```js
ajax(url, result => {
  console.log(result)
})
```

回调函数的最大缺点就是容易写出回调地狱(callback hell)：

```js
ajax(url1, result1 => {
  console.log(result1)
  ajax(url2, result2 => {
    console.log(result2)
    ajax(url3, result3 => {
      console.log(result3)
    })
  })
})
```

回调函数的缺陷：

1. 函数嵌套导致耦合性较高，代码可读性、可维护性较差
2. 回调函数的信任问题，回调函数往往是交给容器函数执行(不确定回调函数会不会执行、什么时候执行、执行多少次等等)
3. 回调函数不能直接返回值，因为回调函数的返回值会被容器函数接收
4. 不能使用 try...catch 捕获错误

### Promise

回调地狱有两个主要的问题：

1. 函数多层嵌套
2. 回调函数每次都要去处理成功和失败这两种可能性(error-first callback)

Promise 利用了三种方式来解决回调地狱的问题：

1. 回调函数延迟绑定(解决函数嵌套)
2. 返回值穿透(支持链式调用)
3. 错误冒泡(避免回调函数重复的错误处理)

#### 实例方法

##### Promise.prototype.then()

promise 实例拥有一个 then 方法，回调函数不是通过直接声明，而是通过 then() 方法传入的，这就是回调函数的延迟绑定。

```js
let readFilePromise = filename => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

readFilePromise('fileA.txt').then(data => {
  return readFilePromise('fileB.txt')
})
```

回调函数返回的 promise，可以穿透到容器函数，作为 then 方法的返回值，从而支持链式调用。回调函数的延迟绑定和返回值穿透解决了回调地狱的函数嵌套问题。

```js
let x = readFilePromise('fileA.txt').then(data => {
  // 回调函数返回的 promise 作为了容器函数的返回值
  return readFilePromise('fileB.txt')
})

x.then(data => {
  return readFilePromise('fileC.txt')
})

// 可以改写为
readFilePromise('fileA.txt').then(data => {
  return readFilePromise('fileB.txt')
}).then(data => {
  return readFilePromise('fileC.txt')
})
```

##### Promise.prototype.catch()

promise 实例还有一个 catch 方法，回调函数产生的错误会一直向后传递，直到被 catch 方法捕获统一对错误进行处理，避免频繁地检查错误增加代码的混乱度，这就是错误冒泡。

```js
readFilePromise('fileA.txt').then(data => {
  return readFilePromise('fileB.txt')
}).then(data => {
  return readFilePromise('fileC.txt')
}).catch(error => { // 错误处理
  console.log(error)
})
```

#### 静态方法

##### Promise.all()

```js
// 使用场景：合并多个请求

// 获取轮播数据列表
function getBannerList() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve('轮播数据')
    }, 300)
  })
}

// 获取店铺列表
function getStoreList() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve('店铺数据')
    }, 500)
  })
}

// 获取分类列表
function getCategoryList() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve('分类数据')
    }, 700)
  })
}

function initLoad() {
  Promise.all([getBannerList(), getStoreList(), getCategoryList()])
    .then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
}

initLoad() // [ '轮播数据', '店铺数据', '分类数据' ]
```

##### Promise.allSettled()

```js
const resolved = Promise.resolve(2)
const rejected = Promise.reject(-1)

Promise.allSettled([resolved, rejected])
  .then(function (results) {
    console.log(results);
  }); // [{ status: 'fulfilled', value: 2 }, { status: 'rejected', reason: -1 }]
```

##### Promise.any()

```js
const resolved = Promise.resolve(2)
const rejected = Promise.reject(-1)

Promise.any([resolved, rejected])
  .then(function (results) {
    console.log(results)
  }) // 2
```

##### Promise.race()

```js
// 使用场景：资源加载和超时判断

// 请求某个图片资源
function requestImg() {
  return new Promise(function (resolve, reject) {
    var img = new Image()
    img.onload = function () { resolve(img) }
    img.src = 'http://www.baidu.com/img/flexible/logo/pc/result.png';
  })
}

// 延时函数，用于给请求计时
function timeout() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject('图片请求超时')
    }, 5000)
  })
}

Promise.race([requestImg(), timeout()])
  .then(function (results) {
    console.log(results);
  })
  .catch(function (reason) {
    console.log(reason);
  }) // 图片请求超时
```

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









