class Stack {
  constructor() {
    this.items = []
  }

  // 向栈顶添加一个新元素
  push(value) {
    return this.items.push(value)
  }

  // 栈顶弹出一个元素
  pop() {
    return this.items.pop()
  }

  // 返回栈顶的元素但不出栈
  peek() {
    let top = this.items.length - 1
    return this.items[top]
  }

  isEmpty() {
    return this.items.length === 0
  }

  size() {
    return this.items.length
  }

  clear() {
    this.items = []
  }
}

const stack = new Stack()
stack.push(5)
stack.push(8)