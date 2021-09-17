## 数组去重

### splice 方法

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

### 新数组

```js
let array = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5]

function unique(array) {

  // 创建一个新数组，用来保存去重后的数组
  const filter = []

  // 遍历原数组，每次取出一个元素放进新数组
  array.forEach((elem) => {
    // 放进新数组时判断新数组中是否存在，-1 表示不存在
    if (filter.indexOf(elem) === -1) {
      filter.push(elem)
    }
  })

  return filter
}

unique(array) // [ 1, 2, 3, 4, 5 ]
```

```js
let array = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5]

function unique(array) {

  // 创建一个新数组，用来保存去重后的数组
  const filter = []

  // 遍历原数组，每次取出一个元素放进新数组
  array.forEach((elem) => {
    // 放进新数组时判断新数组中是否存在
    if (!filter.includes(elem)) {
      filter.push(elem)
    }
  })

  return filter
}

unique(array) // [ 1, 2, 3, 4, 5 ]
```

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

