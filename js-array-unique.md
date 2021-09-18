## 数组去重

### 思路一：比较相等

#### 双循环 + splice()

```js
let array = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5]

function unique(array) {

  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j]) {
        // splice 会改变原数组，删掉一个元素后，后一个元素会占用前一个元素的下标
        array.splice(j, 1)
        j--
      }
    }
  }

  return array
}

unique(array) // [ 1, 2, 3, 4, 5 ]
```

#### 排序 + 单循环 + splice()

```js
let array = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5]

function unique(array) {

  // 对 array 进行升序排序，重复元素相邻排列
  array.sort((a, b) => a - b)

  // 对元素进行两两比较，如果相同就删掉一个
  for (let i = 0; i < array.length; i++) {
    if (array[i] === array[i + 1]) {
      array.splice(i, 1)
      i--
    }
  }

  return array
}

unique(array) // [ 1, 2, 3, 4, 5 ]
```

### 思路二：新数组过滤

#### forEach 遍历 + indexOf()

```js
let array = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5]

function unique(array) {

  // 创建一个新数组，用来保存去重后的数组
  const result = []

  // 遍历原数组，每次取出一个元素放进新数组
  array.forEach((elem) => {
    // 放进新数组时判断新数组中是否存在，-1 表示不存在
    // indexOf 无法判断 NaN，因为 NaN 和自身不相等
    if (result.indexOf(elem) === -1) {
      result.push(elem)
    }
  })

  return result
}

unique(array) // [ 1, 2, 3, 4, 5 ]
```

#### forEach 遍历 + includes()

```js
let array = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5]

function unique(array) {

  // 创建一个新数组，用来保存去重后的数组
  const result = []

  // 遍历原数组，每次取出一个元素放进新数组
  array.forEach((elem) => {
    // 放进新数组时判断新数组中是否存在
    // includes 弥补 indexOf 的缺陷，可以判断 NaN
    if (!result.includes(elem)) {
      result.push(elem)
    }
  })

  return result
}

unique(array) // [ 1, 2, 3, 4, 5 ]
```

#### reduce 遍历 + includes()

```js
let array = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5]

function unique(array) {

  return array.reduce((pre, cur) => {
    if (!pre.includes(cur)) {
      pre.push(cur)
    }
    return pre
  }, [])
}

unique(array) // [ 1, 2, 3, 4, 5 ]
```

#### filter 遍历 + indexOf()

```js
let array = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5]

function unique(array) {

  return array.filter((elem, index) => {
    // indexOf 总是返回找到的第一个元素的下标
    // indexOf 返回的下标不等于当前元素的下标即为重复元素
    return array.indexOf(elem) === index
  })
}

unique(array) // [ 1, 2, 3, 4, 5 ]
```

#### set 数据结构

```js
let array = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5]

function unique(array) {

  // 创建一个 set 数据结构，set 中的值都是唯一的
  // const set = new Set()

  // set 不会添加重复的值
  // array.forEach((elem) => set.add(elem))

  // 或者可以直接使用数组创建 set
  const set = new Set(array)

  return [...set]
}

unique(array) // [ 1, 2, 3, 4, 5 ]
```

#### map 数据结构

```js
let array = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5]

function unique(array) {

  // 创建一个 map 数据结构
  const map = new Map()

  array.forEach((elem) => {
    // 使用 map.has() 判断元素是否重复
    if (!map.has(elem)) {
      map.set(elem, 'unique')
    }
  })

  return [...map.keys()]
}

unique(array) // [ 1, 2, 3, 4, 5 ]
```

