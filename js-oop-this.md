## this 关键字

### call & apply

### bind

> 面试题：请实现一个 `bind` 函数。

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

> 面试题：一个函数多次 `bind` 后的 `this` 指向，请回答下面代码的输出。

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

