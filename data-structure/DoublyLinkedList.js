const { Node, LinkedList } = require('./LinkedList.js')

class DoublyNode extends Node {
  constructor(value) {
    super(value)
    this.prev = null
  }
}

class DoublyLinkedList extends LinkedList {
  constructor() {
    super()
    this.tail = null
  }

  insert(value, index) {
    if (index < 0 || index > this.count)
      return false

    let node = new DoublyNode(value)
    let current = this.head

    if (index === 0) { // 在第 0 个节点插入
      if (!current) { // 如果链表为空
        this.head = node
        this.tail = node
      } else { // 如果链表不为空
        this.head = node
        node.next = current
        current.prev = node
      }
    } else if (index === this.count) { // 在最后一个节点插入
      current = this.tail
      current.next = node
      node.prev = current
      this.tail = node
    } else { // 在中间位置插入节点
      let previous = this.getNodeAt(index - 1)
      current = previous.next
      previous.next = node
      node.prev = previous
      node.next = current
      current.prev = node
    }

    this.count++
    return true
  }
}

const dblist = new DoublyLinkedList()
dblist.insert(15, 0)
dblist.insert(10, 1)
dblist.insert(13, 2)
dblist.insert(11, 3)
dblist.insert(12, 4)

// console.log(dblist)

let result = []
let current = dblist.tail
while (current) {
  result.push(current.value)
  current = current.prev
}
console.log(result)

result = []
current = dblist.head
while (current) {
  result.push(current.value)
  current = current.next
}
console.log(result)