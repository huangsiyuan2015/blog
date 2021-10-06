## 实现 EventEmitter

eventEmitter 的基本用法：

```js
const { EventEmitter } = require('events')

let eventEmitter = new EventEmitter()

let listener1 = (name) => { console.log('hello ' + name) }
let listener2 = (name) => { console.log('hi ' + name) }

// on 方法监听事件
eventEmitter.on('greet', listener1)
eventEmitter.on('greet', listener2)

// emit 方法触发事件
eventEmitter.emit('greet', 'ace')
```

### 实现 EventEmitter 构造函数

```js
function EventEmitter() {
  this.events = {} // 事件中心
}
```

### 实现 EventEmitter.prototype.on()

```js
EventEmitter.prototype.on = function (eventName, listener) {

  if (!this.events[eventName]) {
    this.events[eventName] = []
  }
  this.events[eventName].push(listener)
}
```

### 实现 EventEmitter.prototype.emit()

```js
EventEmitter.prototype.emit = function (eventName, ...args) {

  if (!this.events[eventName])
    return

  this.events[eventName].forEach((listener) => {
    listener(...args)
  })
}
```

测试一下代码：

```js
let eventEmitter = new EventEmitter()

let listener1 = (name) => { console.log('hello ' + name) }
let listener2 = (name) => { console.log('hi' + name) }

eventEmitter.on('greet', listener1)
eventEmitter.on('greet', listener2)

eventEmitter.emit('greet', 'ace')
// 'hello ace'
// 'hi ace'
```

### 实现 EventEmitter.prototype.off()

```js
EventEmitter.prototype.off = function (eventName, listener) {

  if (!this.events[eventName])
    return

  let index = this.events[eventName].findIndex((item) => item === listener)

  if (index !== -1) {
    this.events[eventName].splice(index, 1)
  }

  if (this.events[eventName].length === 0) {
    delete this.events[eventName]
  }
}
```

测试一下代码：

```js
let eventEmitter = new EventEmitter()

let listener1 = (name) => { console.log('hello ' + name) }
let listener2 = (name) => { console.log('hi' + name) }

eventEmitter.on('greet', listener1)
eventEmitter.on('greet', listener2)

eventEmitter.off('greet', listener2)

eventEmitter.emit('greet', 'ace')
// 'hello ace'
```

### 实现 EventEmitter.prototype.offAll()

```js
EventEmitter.prototype.offAll = function (eventName) {

  if (this.events[eventName]) {
    delete this.events[eventName]
  }
}
```

测试一下代码：

```js
let eventEmitter = new EventEmitter()

let listener1 = (name) => { console.log('hello ' + name) }
let listener2 = (name) => { console.log('hi' + name) }
let listener3 = (msg) => { console.log(msg) }

eventEmitter.on('greet', listener1)
eventEmitter.on('greet', listener2)
eventEmitter.on('say', listener3)

eventEmitter.offAll('greet')

eventEmitter.emit('greet', 'ace')
eventEmitter.emit('say', 'hello world')
// 'hello world'
```

完整代码请看 [EventEmitter.js](EventEmitter.js) 文件。

## 发布订阅模式

其实 EventEmitter 就是一个典型的发布订阅模式，把方法名改一下就更直观了。

```js
function PubSub() {
  this.events = {}
}

// 订阅事件
PubSub.prototype.subscribe = function (eventName, listener) {

  if (!this.events[eventName]) {
    this.events[eventName] = []
  }
  this.events[eventName].push(listener)
}

// 发布事件
PubSub.prototype.publish = function (eventName, ...args) {

  if (!this.events[eventName])
    return

  this.events[eventName].forEach((listener) => {
    listener(...args)
  })
}

// 取消订阅
PubSub.prototype.unsubscribe = function (eventName, listener) {

  if (!this.events[eventName])
    return

  let index = this.events[eventName].findIndex((item) => item === listener)

  if (index !== -1) {
    this.events[eventName].splice(index, 1)
  }

  if (this.events[eventName].length === 0) {
    delete this.events[eventName]
  }
}

// 取消所有订阅
PubSub.prototype.unsubscribeAll = function (eventName) {

  if (this.events[eventName]) {
    delete this.events[eventName]
  }
}
```

