const { Node, LinkedList } = require('./LinkedList.js')

class CircularLinkedList extends LinkedList {
  constructor() {
    super()
  }

  insert(value, index) {
    if (index < 0 || index > this.count)
      return false

    let node = new Node(value)

    if (index === 0) { // 在第 0 个位置插入
      if (!this.head) { // 链表为空
        this.head = node
        node.next = node
      } else { // 链表不为空
        let current = this.head
        this.head = node
        node.next = current
        current = this.getNodeAt(this.size())
        current.next = node
      }
    } else {
      let previous = this.getNodeAt(index - 1)
      node.next = previous.next
      previous.next = node
    }

    this.count++
    return true
  }
}

const cclist = new CircularLinkedList()
cclist.insert(15, 0)
cclist.insert(10, 1)
cclist.insert(13, 2)
cclist.insert(11, 3)
cclist.insert(12, 4)