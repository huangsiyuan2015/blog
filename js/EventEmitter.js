function EventEmitter() {
  this.events = {}
}

EventEmitter.prototype.on = function (eventName, listener) {

  if (!this.events[eventName]) {
    this.events[eventName] = []
  }
  this.events[eventName].push(listener)
}

EventEmitter.prototype.emit = function (eventName, ...args) {

  if (!this.events[eventName])
    return

  this.events[eventName].forEach((listener) => {
    listener(...args)
  })
}

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

EventEmitter.prototype.offAll = function (eventName) {

  if (this.events[eventName]) {
    delete this.events[eventName]
  }
}