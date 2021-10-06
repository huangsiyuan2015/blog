class Node {
  constructor(key) {
    this.key = key
    this.left = null
    this.right = null
  }
}

class BinarySearchTree {

  constructor() {
    this.root = null // 根节点
  }

  insert(key) {
    if (this.root === null) {
      this.root = new Node(key)
    } else {
      this.insertNode(this.root, key)
    }
  }

  insertNode(node, key) {
    if (key < node.key) {
      if (node.left === null) {
        node.left = new Node(key)
      } else {
        this.insertNode(node.left, key)
      }
    } else {
      if (node.right === null) {
        node.right = new Node(key)
      } else {
        this.insertNode(node.right, key)
      }
    }
  }

  // 先序遍历
  preOrderTraverse(callback) {
    this.#preOrderTraverseNode(this.root, callback)
  }

  // 递归实现
  // #preOrderTraverseNode(node, callback) {
  //   if (node !== null) {
  //     callback(node.key)
  //     this.#preOrderTraverseNode(node.left, callback)
  //     this.#preOrderTraverseNode(node.right, callback)
  //   }
  // }

  // 非递归实现（栈）
  #preOrderTraverseNode(node, callback) {

    if (node !== null) {

      const stack = []
      stack.push(node)

      while (stack.length) {

        node = stack.pop()
        callback(node.key)

        if (node.right) stack.push(node.right)
        if (node.left) stack.push(node.left)
      }
    }
  }

  // 中序遍历
  inOrderTraverse(callback) {
    this.#inOrderTraverseNode(this.root, callback)
  }

  // 递归实现
  // #inOrderTraverseNode(node, callback) {
  //   if (node !== null) {
  //     this.#inOrderTraverseNode(node.left, callback)
  //     callback(node.key)
  //     this.#inOrderTraverseNode(node.right, callback)
  //   }
  // }

  // 非递归实现（栈）
  #inOrderTraverseNode(node, callback) {

    if (node !== null) {

      const stack = []

      while (node || stack.length) {

        if (node) {
          stack.push(node)
          node = node.left
        } else {
          node = stack.pop()
          callback(node.key)
          node = node.right
        }
      }
    }
  }

  // 后序遍历
  postOrderTraverse(callback) {
    this.#postOrderTraverseNode(this.root, callback)
  }

  // 递归实现
  // #postOrderTraverseNode(node, callback) {
  //   if (node !== null) {
  //     this.#postOrderTraverseNode(node.left, callback)
  //     this.#postOrderTraverseNode(node.right, callback)
  //     callback(node.key)
  //   }
  // }

  // 非递归实现（栈），调整先序遍历顺序，然后翻转遍历记录
  #postOrderTraverseNode(node, callback) {

    if (node !== null) {

      const stack = []
      stack.push(node)
      const array = []

      while (stack.length) {

        node = stack.pop()
        array.push(node) // 保存遍历顺序，根右左

        if (node.left) stack.push(node.left)
        if (node.right) stack.push(node.right)
      }

      // 翻转数组，变为左右根
      array.reverse().forEach(node => callback(node.key))
    }
  }

  // 非递归实现（栈）
  // #postOrderTraverseNode(node, callback) {

  //   if (node !== null) {

  //     const stack = []

  //     while (node || stack.length) {

  //       if (node) {
  //         stack.push({ node, flag: false }) // 添加标志位
  //         node = node.left
  //       } else {

  //         // 当 node 为 null  时，栈顶为根节点
  //         // 取出根节点的值，但根节点不出栈
  //         let top = stack[stack.length - 1]

  //         // 判断根节点的标志位
  //         if (!top.flag) { // false 表示还未访问根节点的右子树
  //           top.flag = true
  //           node = top.node.right
  //         } else { // true 表示左右子树已经访问完，根节点可以出栈
  //           node = stack.pop().node
  //           callback(node.key)
  //           node = null // 注意 node 置为 null
  //         }
  //       }
  //     }
  //   }
  // }

  // 非递归实现（栈）
  // #postOrderTraverseNode(node, callback) {

  //   if (node !== null) {

  //     const stack = []
  //     stack.push(node)

  //     let pre = null
  //     while (stack.length) {

  //       // 取栈顶的节点，但不出栈
  //       let top = stack[stack.length - 1]

  //       // 如果栈顶节点没有左右孩子，则该节点为叶子节点，可以出栈
  //       // 如果之前出栈的节点是栈顶节点的左右孩子，则该节点的左右子树已访问完，可以出栈
  //       if (
  //         (top.left === null && top.right === null) ||
  //         (pre !== null && (pre === top.left || pre === top.right))
  //       ) {
  //         node = stack.pop()
  //         callback(node.key)
  //         pre = node
  //       } else {
  //         if (top.right) stack.push(top.right)
  //         if (top.left) stack.push(top.left)
  //       }
  //     }
  //   }
  // }

  // 层序遍历
  levelOrderTraverse(callback) {
    this.#levelOrderTraverseNode(this.root, callback)
  }

  // 队列实现
  #levelOrderTraverseNode(node, callback) {

    if (node !== null) {

      const queue = []
      queue.push(node)

      while (queue.length) {

        node = queue.shift()
        callback(node.key)

        if (node.left) queue.push(node.left)
        if (node.right) queue.push(node.right)
      }
    }
  }

  min() {
    return this.#minNode(this.root)
  }

  #minNode(node) {
    while (node !== null & node.left !== null) {
      node = node.left
    }
    return node.key
  }

  max() {
    return this.#maxNode(this.root)
  }

  #maxNode(node) {
    while (node !== null && node.right !== null) {
      node = node.right
    }
    return node.key
  }

  search(key) {
    return this.#searchNode(this.root, key)
  }

  #searchNode(node, key) {
    if (node === null) {
      return false
    } else if (key < node.key) {
      return this.#searchNode(node.left, key)
    } else if (key > node.key) {
      return this.#searchNode(node.right, key)
    } else {
      return true
    }
  }

  remove(key) {
    this.root = this.#removeNode(this.root, key)
  }

  #removeNode(node, key) {

    if (node === null)
      return null

    if (key < node.key) {
      node.left = this.#removeNode(node.left, key)
      return node
    } else if (key > node.key) {
      node.right = this.#removeNode(node.right, key)
      return node
    } else { // 找到了要删除的节点

      // 如果该节点是一个叶子节点，将父节点指向 null
      if (node.left === null && node.right === null) {
        return null
      }

      // 如果该节点有一个孩子节点，将父节点指向孩子节点
      if (node.left == null) {
        return node.right
      } else if (node.right === null) {
        return node.left
      }

      // 如果该节点有两个孩子节点，那么找到该节点右子树的最小值替换
      // 然后再删掉右子树的最小值节点
      let min = this.#minNode(node.right)
      node.key = min
      node.right = this.#removeNode(node.right, min)
      return node
    }
  }
}

const tree = new BinarySearchTree()
const array = [11, 7, 15, 5, 3, 9, 8, 10, 13, 12, 14, 20, 18, 25, 6]
array.forEach(num => tree.insert(num))
console.log(tree)

tree.inOrderTraverse((key) => console.log(key))
// tree.preOrderTraverse((key) => console.log(key))
// tree.postOrderTraverse((key) => console.log(key))
// tree.levelOrderTraverse((key) => console.log(key))
// console.log('min: ', tree.min())
// console.log('max: ', tree.max())
// console.log(tree.search(60))