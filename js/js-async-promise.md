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

#### 同步回调 vs 异步回调

回调函数(callback)是 js 最早的异步编程方式，但不是所有的回调函数都是异步的，回调函数分为**同步回调**和**异步回调**。

同步回调是指回调函数在容器函数返回之前执行完，典型的同步回调有数组的 forEach(callback)、map(callback)、filter(callback) ...

```js
function executor(callback) {
  console.log(1)
  callback()
  console.log(2)
}

executor(function () {
  console.log('sync callback')
})
// 1
// sync callback
// 2
```

异步回调是指回调函数没有在容器函数内部执行，典型的异步回调有 setTimeout(callback)、setInterval(callback)、requestAnimationFrame(callback) ...

```js
function executor(callback) {
  console.log(1)
  setTimeout(callback, 0);
  console.log(2)
}

executor(function () {
  console.log('async callback')
})
// 1
// 2
// async callback
```

#### 回调地狱

使用回调函数来进行异步编程，实现一个异步加载 js 文件的函数：

```js
function loadScript(src, resolve, reject) {

  let script = document.createElement('script')
  script.src = src
  document.head.append(script)

  // 绑定加载成功时的回调函数
  script.onload = () => resolve(script)
  // 绑定加载失败时的回调函数
  script.onerror = () => reject(new Error(`script load error for ${src}`))
}

loadScript('./hello.js', function (script) {
  console.log(script)
  hello() // hello.js 中的函数
}, function (error) {
  console.log(error)
})
```

加载一个 js 文件还好，如果依次加载两个、三个 js 文件，代码不像同步代码那样自上而下线性发展，而是从左往右变得冗余。

```js
loadScript('./hello.js', function (script) {
  console.log(script)
  hello()
  loadScript('./vue.js', function (script) {
    console.log(script)
    loadScript('./react.js', function (script) {
      console.log(script)
    }, function (error) {
      console.log(error)
    })
  }, function (error) {
    console.log(error)
  })
}, function (error) {
  console.log(error)
})
```

可以使用 node.js 中错误优先(error-first)的编程风格，来减少回调函数的个数：

```js
function loadScript(src, callback) {

  let script = document.createElement('script')
  script.src = src
  document.head.append(script)

  // 绑定加载成功时的回调函数
  script.onload = () => callback(null, script)
  // 绑定加载失败时的回调函数
  script.onerror = () => callback(new Error(`script load error for ${src}`))
}
```

虽然减少了回调函数的个数，但是错误优先的回调函数，看起来并没有解决代码冗余的问题，可读性和可维护性仍然很差。

```js
loadScript('./hello.js', function (error, script) {
  if (error) {
    console.log(error)
  } else {
    console.log(script)
    hello()
    loadScript('./vue.js', function (error, script) {
      if (error) {
        console.log(error)
      } else {
        console.log(script)
        loadScript('./react.js', function (error, script) {
          if (error) {
            console.log(error)
          } else {
            console.log(script)
          }
        })
      }
    })
  }
})
```

这被称为回调地狱(callback hell)，造成回调地狱的原因主要有两点：

1. **回调函数的嵌套调用**，后面的任务依赖前面任务的返回结果，并在前面任务的回调函数内部执行新的业务逻辑
2. **重复的错误处理**，每个任务都有返回成功和失败的可能，每次对回调函数都要做错误处理，增加代码的混乱度

为了解决回调地狱的问题，诞生出了新的异步编程方式——Promise，Promise 本质上解决的是异步编程风格的问题。

### Promise

使用 Promise 改写之前使用回调函数实现的异步加载 js 文件的函数：

```js
function loadScriptPromise(src) {

  return new Promise((resolve, reject) => {

    let script = document.createElement('script')
    script.src = src
    document.head.append(script)

    // 加载成功时调用 resolve 方法，将 promise 的状态改为 fullfilled
    script.onload = () => resolve(script)
    // 加载失败时调用 reject 方法，将 promise 的状态改为 rejected
    script.onerror = () => reject(new Error(`script load error for ${src}`))
  })
}

loadScriptPromise('./hello.js')
  .then(
    (script) => {
      console.log(script)
      hello() // hello.js 中的函数
    },
    (error) => console.log(error)
  )
```

#### 解决回调地狱

Promise 主要采用了以下几种方式解决了回调地狱的问题：

1. **回调函数的延迟绑定**
2. **回调函数的返回值穿透**
3. **错误冒泡**

回调函数的延迟绑定和回调函数的返回值穿透解决了回调函数循环嵌套的问题，错误冒泡解决了重复错误处理的问题。

#### then()

回调函数不再是直接传到容器函数，而是通过 Promise 对象的 then 方法传入，这就是回调函数的延迟绑定。

因为回调函数的延迟绑定，promise 的状态 resolved 之后可能还未调用 then 方法，所以 then 中的回调函数一定是异步执行的。

```js
// 回调函数直接绑定
loadScript('./hello.js', onResolve, onReject)

// promise.then() 绑定回调函数
loadScriptPromise('./hello,js').then(onResolve, onReject)
```

#### 返回值穿透

then 方法中回调函数的返回值决定 then 方法的返回值，要实现 then 方法的链式调用，所以 then 方法也要返回一个 promise 对象。

如果 then 方法中回调函数的返回值不是 promise 对象，那么要把它封装成 promise 对象，否则直接返回回调函数返回的 promise 对象。

```js
loadScriptPromise('./hello.js')
  .then(
    (script) => {
      console.log(script)
      hello()
      return loadScriptPromise('./vue.js')
    },
    (error) => console.log(error)
  )
  .then(
    (script) => {
      console.log(script)
      return loadScriptPromise('./react.js')
    },
    (error) => console.log(error)
  )
  .then(
    (script) => console.log(script),
    (error) => console.log(error)
  )
```

#### catch()

then 方法要求传入两个参数，第一个参数是成功时的回调，第二个参数是错误时的回调，但第二个参数可以省略。

省略了 then 方法中的错误回调，可以通过 Promise 对象的 catch 方法来对错误统一进行处理。

```js
loadScriptPromise('./hello.js')
  .then(
    (script) => {
      console.log(script)
      hello()
      return loadScriptPromise('./vue.js')
    }
  )
  .then(
    (script) => {
      console.log(script)
      return loadScriptPromise('./react.js')
    }
  )
  .then(
    (script) => console.log(script)
  )
  .catch(
    (error) => console.log(error)
  )
```

