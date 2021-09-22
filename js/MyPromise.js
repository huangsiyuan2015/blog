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

      // 异步调用 pending 状态时保存的回调函数
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

    // 异步调用 pending 状态时保存的回调函数
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