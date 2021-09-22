## 实现 Promise/A+ 规范的 Promise

promise 有三种状态：

1. pending（等待态）
2. fullfilled（完成态）
3. rejected（失败态）

promise 被创建时默认是 pending 状态，调用 resolve 方法后，状态会从 pending 状态变为 fullfilled 状态；调用 reject 方法后，状态会从 pending 状态变为 rejected 状态；状态变化只能发生一次且不可逆。

### 回调函数延迟绑定

原生 promise 的用法：

```js
new Promise((resolve, reject) => {
  resolve('sync resolve in executor') // 同步调用 resolve
  // reject('sync reject in executor') // 同步调用 reject
}).then(
	value => console.log(value),
  error => console.log(error)
)
```

根据原生 Promise 的用法，大致实现一个构造函数：

```js
const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

function MyPromise(executor) {
  
  this.state = PENDING // promise 的初始状态
  this.value = undefined // resolve 时的值
  this.reason = undefined // reject 时的值

  // 状态只能由 pending 变为 resolved
  let resolve = value => {
    if (this.state === PENDING) {
      this.state = FULLFILLED
      this.value = value
    }
  }

  // 状态只能由 pending 变为 rejected
  let reject = reason => {
    if (this.state === PENDING) {
      this.state = REJECTED
      this.reason = reason
    }
  }

  // 调用构造函数中传递的容器函数，容器函数是同步执行的
  // 容器函数执行过程中可能出错，所以使用 try...catch 包裹
  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}
```

then 方法中注册的回调函数都是异步调用的，接下来实现 then 方法：

1. 如果容器函数 executor 中，同步调用 resolve/reject，那么调用 then 方法时，promise 的状态已经变为 fullfilled/rejected
2. 如果容器函数 executor 中，异步调用 resolve/reject，那么调用 then 方法时，promise 的状态仍然还是 pending

```js
MyPromise.prototype.then = function (onResolved, onRejected) {

  // executor 中同步调用 resolve
  // 进入 then 方法时 promise 的状态变为 fullfilled，异步调用回调函数
  if (this.state === FULLFILLED) {
    setTimeout(() => {
      onResolved(this.value)
    })
  }
  
  // executor 中同步调用 reject
  // 进入 then 方法时 promise 的状态变为 rejected，异步调用回调函数
  if (this.state === REJECTED) {
    setTimeout(() => {
      onRejected(this.reason)
    })
  }
  
  // executor 中异步调用 resolve/reject
  // 进入 then 方法时 promise 的状态仍然还是 pending，将回调函数保存起来
  // 回调函数将在 promise 构造函数中的 resolve/reject 函数中异步调用
  if (this.state === PENDING) {
    this.onResolvedCbs.push(() => {
      onResolved(this.value)
    })
    this.onRejectedCbs.push(() => {
      onRejected(this.reason)
    })
  }
}
```

所以需要修改 MyPromise 构造函数：

1. 添加两个数组分别保存成功和失败时的回调
2. 在 resolve 和 reject 函数体中异步执行保存的回调函数

```js
const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

function MyPromise(executor) {
  
  this.state = PENDING // promise 的初始状态
  this.value = undefined // resolve 时的值
  this.reason = undefined // reject 时的值
  
  this.onResolvedCbs = [] // 保存成功时的回调
  this.onRejectedCbs = [] // 保存失败时的回调

  // 状态只能由 pending 变为 resolved
  let resolve = value => {
    if (this.state === PENDING) {
      this.state = FULLFILLED
      this.value = value
      
      // 异步调用保 pending 状态保存的回调函数
      if (this.onResolvedCbs.length > 0) {
        setTimeout(() => {
          this.onResolvedCbs.forEach(cb => cb())
        })
      }
    }
  }

  // 状态只能由 pending 变为 rejected
  let reject = reason => {
    if (this.state === PENDING) {
      this.state = REJECTED
      this.reason = reason
    }
    
    // 异步调用保 pending 状态保存的回调函数
    if (this.onRejectedCbs.length > 0) {
      setTimeout(() => {
        this.onRejectedCbs.forEach(cb => cb())
      })
    }
  }

  // 调用构造函数中传递的容器函数，容器函数是同步执行的
  // 容器函数执行过程中可能出错，所以使用 try...catch 包裹
  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}
```

测试一下代码：

```js
new MyPromise((resolve, reject) => {
  // resolve('sync resolve in executor') // 同步调用 resolve
  // reject('sync reject in executor') // 同步调用 reject
  
  setTimeout(() => {
    resolve('async resolve in executor') // 异步调用 resolve
    // reject('async reject in executor') // 异步调用 reject
  })
}).then(
  value => console.log('onResolved1 :', value),
  error => console.log('onRejected1 :', error)
)

console.log('sync')
```

### 回调函数返回值穿透

实现回调函数的返回值穿透，即根据回调函数的返回值决定 then 方法的返回值，要实现 promise 的链式调用，then 方法始终要返回一个 promise：

1. 如果回调函数返回一个 promise，那么 then 方法将返回一个新的相同状态的 promise
2. 如果回调函数返回一个非 promise，那么 then 方法将封装一个 promise 返回

修改 then 方法：

```js
MyPromise.prototype.then = function (onResolved, onRejected) {

  // then 方法始终返回一个 promise
  return new Promise((resolve, reject) => {

    // executor 中同步调用 resolve
    // 进入 then 方法时 promise 的状态变为 fullfilled，异步调用回调函数
    if (this.state === FULLFILLED) {
      setTimeout(() => {
        // 根据回调函数的返回决定 then 方法的返回值
        let result = onResolved(this.value)
        
        // 如果返回一个 promise，传递该 promise 的状态和值
        if (result instanceof MyPromise) {
          result.then(resolve, reject)
        } else {
          // 如果返回一个非 promise，把该值封装成一个 fullfilled 状态的 promise
          resolve(result)
        }
      })
    }

    // executor 中同步调用 reject
    // 进入 then 方法时 promise 的状态变为 rejected，异步调用回调函数
    if (this.state === REJECTED) {
      setTimeout(() => {
        // 根据回调函数的返回决定 then 方法的返回值
        let result = onRejected(this.reason)
        
        // 如果返回一个 promise，传递该 promise 的状态和值
        if (result instanceof MyPromise) {
          result.then(resolve, reject)
        } else {
          // 如果返回一个非 promise，把该值封装成一个 fullfilled 状态的 promise
          // 注意：这里执行完错误时的回调后，仍然封装成 fullfilled 状态的 promise
          resolve(result)
        }
      })
    }

    // executor 中异步调用 resolve/reject
    // 进入 then 方法时 promise 的状态仍然还是 pending，将回调函数保存起来
    // 回调函数将在 promise 构造函数中的 resolve/reject 函数中异步调用
    if (this.state === PENDING) {
      this.onResolvedCbs.push(() => {
        // 根据回调函数的返回决定 then 方法的返回值
        let result = onResolved(this.value)
        
        // 如果返回一个 promise，传递该 promise 的状态和值
        if (result instanceof MyPromise) {
          result.then(resolve, reject)
        } else {
          // 如果返回一个非 promise，把该值封装成一个 fullfilled 状态的 promise
          resolve(result)
        }
      })

      this.onRejectedCbs.push(() => {
        // 根据回调函数的返回决定 then 方法的返回值
        let result = onRejected(this.reason)
        
        // 如果返回一个 promise，传递该 promise 的状态和值
        if (result instanceof MyPromise) {
          result.then(resolve, reject)
        } else {
          // 如果返回一个非 promise，把该值封装成一个 fullfilled 状态的 promise
          // 注意：这里执行完错误时的回调后，仍然封装成 fullfilled 状态的 promise
          resolve(result)
        }
      })
    }
  })
}
```

发现封装回调函数返回值的代码都是一样的，可以提取成一个函数，then 方法修改为：

```js
MyPromise.prototype.then = function (onResolved, onRejected) {

  // then 方法始终返回一个 promise
  return new Promise((resolve, reject) => {

    let handle = (cb, data) => {
      // 根据回调函数的返回决定 then 方法的返回值
      let result = cb(data)

      // 如果返回一个 promise，传递该 promise 的状态和值
      if (result instanceof MyPromise) {
        result.then(resolve, reject)
      } else {
        // 如果返回一个非 promise，把该值封装成一个 fullfilled 状态的 promise
        resolve(result)
      }
    }

    // executor 中同步调用 resolve
    // 进入 then 方法时 promise 的状态变为 fullfilled，异步调用回调函数
    if (this.state === FULLFILLED) {
      setTimeout(() => {
        handle(onResolved, this.value)
      })
    }

    // executor 中同步调用 reject
    // 进入 then 方法时 promise 的状态变为 rejected，异步调用回调函数
    if (this.state === REJECTED) {
      setTimeout(() => {
        handle(onRejected, this.reason)
      })
    }

    // executor 中异步调用 resolve/reject
    // 进入 then 方法时 promise 的状态仍然还是 pending，将回调函数保存起来
    // 回调函数将在 promise 构造函数中的 resolve/reject 函数中异步调用
    if (this.state === PENDING) {
      this.onResolvedCbs.push(() => {
        handle(onResolved, this.value)
      })

      this.onRejectedCbs.push(() => {
        handle(onRejected, this.reason)
      })
    }
  })
}
```

测试一下代码：

```js
new MyPromise((resolve, reject) => {
  // resolve('sync resolve in executor') // 同步调用 resolve
  // reject('sync reject in executor') // 同步调用 reject
  
  setTimeout(() => {
    resolve('async resolve in executor') // 异步调用 resolve
    // reject('async reject in executor') // 异步调用 reject
  })
}).then(
  value => {
    console.log('onResolved1 :', value)
    // return 1
    return new MyPromise((resolve, reject) => reject(0))
  },
  error => console.log('onRejected1 :', error)
).then(
  value => console.log('onResolved2 :', value),
  error => console.log('onRejected2: ', error)
)

console.log('sync')
```

### 错误冒泡

promise 调用 then 方法可以省略两个回调函数参数，省略参数后 promise 的状态和值仍然可以传递下去。

1. 设置默认回调函数传递抛出的错误
2. 在执行回调函数时使用 try...catch 捕获错误

修改 then 方法：

```js
MyPromise.prototype.then = function (onResolved, onRejected) {

  // 状态传递
  onResolved = typeof onResolved === 'function' ? onResolved : value => value
  onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

  // then 方法始终返回一个 promise
  return new Promise((resolve, reject) => {

    let handle = (cb, data) => {

      // 错误在回调函数中传递，使用 try...catch 捕获
      try {
        // 根据回调函数的返回决定 then 方法的返回值
        let result = cb(data)

        // 如果返回一个 promise，传递该 promise 的状态和值
        if (result instanceof MyPromise) {
          result.then(resolve, reject)
        } else {
          // 如果返回一个非 promise，把该值封装成一个 fullfilled 状态的 promise
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }

    // executor 中同步调用 resolve
    // 进入 then 方法时 promise 的状态变为 fullfilled，异步调用回调函数
    if (this.state === FULLFILLED) {
      setTimeout(() => {
        handle(onResolved, this.value)
      })
    }

    // executor 中同步调用 reject
    // 进入 then 方法时 promise 的状态变为 rejected，异步调用回调函数
    if (this.state === REJECTED) {
      setTimeout(() => {
        handle(onRejected, this.reason)
      })
    }

    // executor 中异步调用 resolve/reject
    // 进入 then 方法时 promise 的状态仍然还是 pending，将回调函数保存起来
    // 回调函数将在 promise 构造函数中的 resolve/reject 函数中异步调用
    if (this.state === PENDING) {
      this.onResolvedCbs.push(() => {
        handle(onResolved, this.value)
      })

      this.onRejectedCbs.push(() => {
        handle(onRejected, this.reason)
      })
    }
  })
}
```

测试一下代码：

```js
new MyPromise((resolve, reject) => {
  resolve('sync resolve in executor') // 同步调用 resolve
  // reject('sync reject in executor') // 同步调用 reject

  // setTimeout(() => {
    // resolve('async resolve in executor') // 异步调用 resolve
    // reject('async reject in executor') // 异步调用 reject
  // })
}).then().then().then()
  .then(
    value => console.log('onResolved2 :', value),
    error => console.log('onRejected2: ', error)
  )

console.log('sync')
```

