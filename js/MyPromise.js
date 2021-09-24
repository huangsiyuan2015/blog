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

      // 异步调用 pending 状态时保存的回调函数
      if (this.onRejectedCbs.length > 0) {
        setTimeout(() => {
          this.onRejectedCbs.forEach(cb => cb())
        })
      }
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

  // 值穿透
  onResolved = typeof onResolved === 'function' ? onResolved : value => value
  onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

  // then 方法始终返回一个 promise
  return new MyPromise((resolve, reject) => {

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
    else if (this.state === REJECTED) {
      setTimeout(() => {
        handle(onRejected, this.reason)
      })
    }

    // executor 中异步调用 resolve/reject
    // 进入 then 方法时 promise 的状态仍然还是 pending，将回调函数保存起来
    // 回调函数将在 promise 构造函数中的 resolve/reject 函数中异步调用
    else if (this.state === PENDING) {
      this.onResolvedCbs.push(() => {
        handle(onResolved, this.value)
      })

      this.onRejectedCbs.push(() => {
        handle(onRejected, this.reason)
      })
    }
  })
}

MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

MyPromise.prototype.finally = function (onFinally) {

  onFinally = typeof onFinally === 'function' ? onFinally : () => { }

  return this.then(
    // onFinally 的返回值可能是 promise 和非 promise，所以使用 resolve 包裹
    // onFinally 虽然不接受 settled 的值，但还是要将 settled 的值传递下去
    value => MyPromise.resolve(onFinally()).then(() => value),
    error => MyPromise.resolve(onFinally()).then(() => { throw error })
  )
}

MyPromise.resolve = function (value) {
  return value instanceof MyPromise
    ? value
    : new MyPromise((resolve, reject) => resolve(value))
}

MyPromise.reject = function (reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason)
  })
}

MyPromise.all = function (promises) {

  return new MyPromise((resolve, reject) => {

    // 保存所有 promise 成功时返回的值
    let values = Array.from({ length: promises.length })

    // 统计 resolved 的次数
    let resolvedCount = 0

    promises.forEach((promise, index) => {

      // 注意：数组中要将非 promise 包装为成功的 promise
      MyPromise.resolve(promise).then(
        value => {
          values[index] = value // value 要和 promise 的下标对应
          resolvedCount++ // 统计 resolved 的次数

          // resolved 的次数等于 promise 的个数时返回成功的 promise
          if (resolvedCount === promises.length) {
            resolve(values)
          }
        },
        error => {
          reject(error)
        }
      )
    })
  })
}

MyPromise.allSettled = function (promises) {
  return MyPromise.all(
    promises.map((promise) => {
      return MyPromise.resolve(promise).then(
        value => ({ state: 'fullfilled', value }),
        reason => ({ state: 'rejected', reason })
      )
    })
  )
}

MyPromise.any = function (promises) {

  return new MyPromise((resolve, reject) => {

    // 统计 rejected 的次数
    let rejectedCount = 0

    promises.forEach((promise) => {

      MyPromise.resolve(promise).then(
        value => { // 有一个 promise 成功就 resolve
          resolve(value)
        },
        error => { // 所有的 promise 都失败才 reject
          rejectedCount++

          if (rejectedCount === promises.length) {
            reject('No Promise in Promise.any was resolved')
          }
        }
      )
    })
  })
}

MyPromise.race = function (promises) {
  return new MyPromise((resolve, reject) => {
    promises.forEach((promise) => {
      MyPromise.resolve(promise).then(resolve, reject)
    })
  })
}