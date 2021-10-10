class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.count = 0
  }

  // 向链表尾部添加一个新元素
  push(value) {
    let node = new Node(value)

    if (!this.head) { // 如果链表为空，将头指针指向该节点
      this.head = node
    } else { // 如果链表不为空，找到最后一个节点，在该节点后面添加
      let current = this.head

      while (current.next) {
        current = current.next
      }
      current.next = node
    }

    this.count++
  }

  // 向链表指定位置添加一个新元素
  insert(value, index) {
    if (index < 0 || index > this.count)
      return false

    let node = new Node(value)

    if (index === 0) { // 如果要在下标为 0 的位置插入
      let current = this.head
      this.head = node
      node.next = current
    } else { // 如果在其它位置插入
      let previous = this.getNodeAt(index - 1)
      node.next = previous.next
      previous.next = node
    }

    this.count++
    return true
  }

  // 返回链表指定元素的位置
  indexOf(value) {
    let current = this.head

    let index = 0
    while (current) {
      if (value === current.value) {
        return index
      }
      index++
      current = current.next
    }

    return -1
  }

  // 从链表中移除一个元素
  remove(value) {
    let index = this.indexOf(value)
    return this.removeAt(index)
  }

  // 移除链表指定位置的元素
  removeAt(index) {
    if (index < 0 || index > this.count)
      return undefined

    // 取到下标为 0 的节点
    let current = this.head

    if (index === 0) { // 如果删除的是第一个节点
      this.head = current.next
    } else { // 如果删除的是第一个节点以外的节点

      // // 要保存待删除节点的前一个节点
      // let previous = null
      // for (let i = 0; i < index; i++) {
      //   previous = current
      //   current = current.next
      // }
      // // 将前一个节点指向待删除节点的下一个节点
      // previous.next = current.next

      // 重构，使用 getNodeAt()
      let previous = this.getNodeAt(index - 1)
      current = previous.next
      previous.next = current.next
    }

    // 将删除节点的指针置空
    current.next = null
    this.count--

    return current
  }

  // 返回链表指定位置的节点
  getNodeAt(index) {
    if (index < 0 || index > this.count)
      return undefined

    // 下标为 0 的节点
    let current = this.head

    // 找指定下标的节点
    for (let i = 0; i < index; i++) {
      current = current.next
    }

    return current
  }

  size() {
    return this.count
  }

  isEmpty() {
    return this.size() === 0
  }

  getHead() {
    return this.head
  }
}

module.exports = {
  Node,
  LinkedList
}

// const list = new LinkedList()
// list.push(15)
// list.push(10)
// list.push(13)
// list.push(11)
// list.push(12)

// console.log(list)