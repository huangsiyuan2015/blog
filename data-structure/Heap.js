class MinHeap {

  constructor() {
    this.heap = []
  }

  getLeftIndex(index) {
    return 2 * index + 1 // 左孩子下标
  }

  getRightIndex(index) {
    return 2 * index + 2 // 右孩子下标
  }

  getParentIndex(index) {
    if (index === 0)
      return undefined
    return (index - 1) >> 1 // 整除2，父节点下标
  }

  insert(value) {
    if (value !== null) {
      this.heap.push(value)
      this.#heapifyUp(this.heap.length - 1)
      return true
    }
    return false
  }

  #heapifyUp(index) {

    let parent = this.getParentIndex(index)

    // 如果子节点比父节点小，上移
    while (index > 0 && this.heap[index] < this.heap[parent]) {
      let temp = this.heap[parent]
      this.heap[parent] = this.heap[index]
      this.heap[index] = temp

      index = parent
      parent = this.getParentIndex(index)
    }
  }

  extract() {
    if (!this.heap.length) {
      return undefined
    } else if (this.heap.length === 1) {
      return this.heap.shift()
    } else {
      let remove = this.heap.shift()
      this.heap.unshift(this.heap.pop())
      this.#heapifyDown(0)
      return remove
    }
  }

  #heapifyDown(index) {

    let minIndex = index
    let left = this.getLeftIndex(index)
    let right = this.getRightIndex(index)
    let size = this.heap.length

    if (left < size && this.heap[minIndex] > this.heap[left]) {
      minIndex = left
    }

    if (right < size && this.heap[minIndex] > this.heap[right]) {
      minIndex = right
    }

    if (minIndex !== index) {
      let temp = this.heap[minIndex]
      this.heap[minIndex] = this.heap[index]
      this.heap[index] = temp

      this.#heapifyDown(minIndex)
    }
  }

  findMin() {
    return this.heap.length ? undefined : this.heap[0]
  }
}

let minHeap = new MinHeap()

let arr = [3, 6, 1, 2, 5, 4, 7, 9, 8]
arr.forEach(num => {minHeap.insert(num)})
console.log(minHeap)

while (minHeap.heap.length) {
  console.log('min :', minHeap.extract())
  console.log(minHeap)
}