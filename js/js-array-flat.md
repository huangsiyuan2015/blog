## 数组展开

数组展开也叫数组扁平化处理，即将一个多维嵌套数组展开成一个一维数组。

### flat()

- 默认展开 1 层
- 展开层数小于 1 返回原数组
- 展开层数等于 Infinity 全部展开
- 会过滤数组空位

```js
const animals = ['🐷', ['🐶', '🐂'], ['🐎', ['🐑', ['🐲']], '🐛']]

flat(animals, 0) // ['🐷', ['🐶', '🐂'], ['🐎', ['🐑', ['🐲']], '🐛']]
flat(animals) // [ '🐷', '🐶', '🐂', '🐎', [ '🐑', [ '🐲' ] ], '🐛' ]
flat(animals, 2) // [ '🐷', '🐶', '🐂', '🐎', '🐑', [ '🐲' ], '🐛' ]
flat(animals, Infinity) // ['🐷', '🐶', '🐂', '🐎', '🐑', '🐲', '🐛']
```

### forEach 遍历 + 递归

```js
const animals = ['🐷', ['🐶', '🐂'], ['🐎', ['🐑', ['🐲']], '🐛']]

function flat(arr) {
  let result = []

  arr.forEach((elem) =>
    // 使用 ... 展开一层
    // Array.isArray(elem) ? result.push(...flat(elem)) : result.push(elem)

    // 使用 concat 展开一层
    // Array.isArray(elem)
    //   ? (result = result.concat(flat(elem)))
    //   : result.push(elem)

    // 使用 apply 展开一层
    Array.isArray(elem) ? [].push.apply(result, flat(elem)) : result.push(elem)
  )

  return result
}

flat(animals) // ['🐷', '🐶', '🐂', '🐎', '🐑', '🐲', '🐛']
```

#### 控制展开层数

```js
const animals = ['🐷', ['🐶', '🐂'], ['🐎', ['🐑', ['🐲']], '🐛']]

function flat(arr, dpt = 1) {
  if (dpt > 0) {
    let result = []

    arr.forEach((elem) =>
      // 使用 ... 展开一层
      // Array.isArray(elem)
      //   ? result.push(...flat(elem, dpt - 1))
      //   : result.push(elem)

      // 使用 concat 展开一层
      // Array.isArray(elem)
      //   ? (result = result.concat(flat(elem, dpt - 1)))
      //   : result.push(elem)

      // 使用 apply 展开一层
      Array.isArray(elem)
        ? [].push.apply(result, flat(elem, dpt - 1))
        : result.push(elem)
    )

    return result
  }

  return arr.slice()
}

flat(animals, 0) // ['🐷', ['🐶', '🐂'], ['🐎', ['🐑', ['🐲']], '🐛']]
flat(animals) // [ '🐷', '🐶', '🐂', '🐎', [ '🐑', [ '🐲' ] ], '🐛' ]
flat(animals, 2) // [ '🐷', '🐶', '🐂', '🐎', '🐑', [ '🐲' ], '🐛' ]
flat(animals, Infinity) // ['🐷', '🐶', '🐂', '🐎', '🐑', '🐲', '🐛']
```

### reduce 遍历 + 递归

```js
const animals = ['🐷', ['🐶', '🐂'], ['🐎', ['🐑', ['🐲']], '🐛']]

function flat(arr) {
  return arr.reduce(
    (pre, cur) => pre.concat(Array.isArray(cur) ? flat(cur) : cur),
    []
  )
}

flat(animals) // ['🐷', '🐶', '🐂', '🐎', '🐑', '🐲', '🐛']
```

#### 控制展开层数

```js
const animals = ['🐷', ['🐶', '🐂'], ['🐎', ['🐑', ['🐲']], '🐛']]

function flat(arr, dpt = 1) {
  return dpt > 0
    ? arr.reduce(
        (pre, cur) => pre.concat(Array.isArray(cur) ? flat(cur, dpt - 1) : cur),
        []
      )
    : arr.slice()
}

flat(animals, 0) // ['🐷', ['🐶', '🐂'], ['🐎', ['🐑', ['🐲']], '🐛']]
flat(animals) // [ '🐷', '🐶', '🐂', '🐎', [ '🐑', [ '🐲' ] ], '🐛' ]
flat(animals, 2) // [ '🐷', '🐶', '🐂', '🐎', '🐑', [ '🐲' ], '🐛' ]
flat(animals, Infinity) // ['🐷', '🐶', '🐂', '🐎', '🐑', '🐲', '🐛']
```

### some() + 展开运算符

```js
const animals = ['🐷', ['🐶', '🐂'], ['🐎', ['🐑', ['🐲']], '🐛']]

function flat(arr) {
  let clone = arr.slice()

  while (clone.some((elem) => Array.isArray(elem))) {
    clone = [].concat(...clone)
  }

  return clone
}

flat(animals) // ['🐷', '🐶', '🐂', '🐎', '🐑', '🐲', '🐛']
```

#### 控制展开层数

```js
const animals = ['🐷', ['🐶', '🐂'], ['🐎', ['🐑', ['🐲']], '🐛']]

function flat(arr, dpt = 1) {
  let clone = arr.slice()

  while (dpt > 0) {
    if (dpt === Infinity && clone.every((elem) => !Array.isArray(elem))) break
    clone = [].concat(...clone)
    dpt--
  }

  return clone
}

flat(animals, 0) // ['🐷', ['🐶', '🐂'], ['🐎', ['🐑', ['🐲']], '🐛']]
flat(animals) // [ '🐷', '🐶', '🐂', '🐎', [ '🐑', [ '🐲' ] ], '🐛' ]
flat(animals, 2) // [ '🐷', '🐶', '🐂', '🐎', '🐑', [ '🐲' ], '🐛' ]
flat(animals, Infinity) // ['🐷', '🐶', '🐂', '🐎', '🐑', '🐲', '🐛']
```

### 利用栈数据结构

```js
const animals = ['🐷', ['🐶', '🐂'], ['🐎', ['🐑', ['🐲']], '🐛']]

function flat(arr) {
  let stack = arr.concat()
  const result = []

  while (stack.length) {
    let elem = stack.pop()

    if (Array.isArray(elem)) {
      // stack.push(...elem) // 使用 ... 展开一层
      // stack = stack.concat(elem) // 使用 concat 展开一层
      ;[].push.apply(stack, elem) // 使用 apply 展开一层
    } else {
      result.unshift(elem)
    }
  }

  return result
}

flat(animals) // ['🐷', '🐶', '🐂', '🐎', '🐑', '🐲', '🐛']
```

### toString() + split()

```js
const animals = ['🐷', ['🐶', '🐂'], ['🐎', ['🐑', ['🐲']], '🐛']]

function flat(arr) {
  // toString() 能够递归展开数组中的每个元素
  // 缺陷是只适用于字符串数组，对于其它数据类型存在类型转换
  return arr.toString().split(',')
}

flat(animals) // ['🐷', '🐶', '🐂', '🐎', '🐑', '🐲', '🐛']
```

### JSON + 正则表达式

```js
const animals = ['🐷', ['🐶', '🐂'], ['🐎', ['🐑', ['🐲']], '🐛']]

function flat(arr) {
  let str = JSON.stringify(arr)
  str = str.replace(/(\[|\])/g, '') // 去掉所有的中括号
  str = '[' + str + ']' // 最外层再包裹一层中括号
  return JSON.parse(str)
}

flat(animals) // ['🐷', '🐶', '🐂', '🐎', '🐑', '🐲', '🐛']
```

## 参考链接

- [面试官连环追问：数组拍平（扁平化） flat 方法实现](https://segmentfault.com/a/1190000021366004)
