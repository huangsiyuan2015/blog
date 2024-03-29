## 数组去重

```js
// 随机数数组生成函数
function randoms() {
  const result = [];
  for (let i = 0; i < 10; i++) {
    // 生成 10 个 [0, 5) 的随机整数
    result.push((Math.random() * 5) | 0);
  }
  console.log(result);
  return result;
}
```

### 思路一：比较相等，删掉重复元素

#### 双循环 + splice()

```js
function unique(array) {

  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j]) {
        // splice 会改变原数组，删掉一个元素后，后一个元素会占用前一个元素的下标
        array.splice(j--, 1)
      }
    }
  }

  return array
}

unique(randoms())
```

#### 排序 + 单循环 + splice()

```js
function unique(array) {

  // 对 array 进行升序排序，重复元素相邻排列
  array.sort((a, b) => a - b)

  // 对元素进行两两比较，如果相同就删掉一个
  for (let i = 0; i < array.length; i++) {
    if (array[i] === array[i + 1]) {
      array.splice(i--, 1)
    }
  }

  return array
}

unique(randoms())
```

### 思路二：加入新数组时过滤

#### forEach 遍历 + indexOf()

```js
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

unique(randoms())
```

#### forEach 遍历 + includes()

```js
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

unique(randoms())
```

#### reduce 遍历 + includes()

```js
function unique(array) {

  // return array.reduce((pre, cur) => {
  //   if (!pre.includes(cur)) {
  //     pre.push(cur)
  //   }
  //   return pre
  // }, [])

  return array.reduce(
    (pre, cur) => (pre.includes(cur) ? pre : pre.concat(cur)),
    []
  )
}

unique(randoms())
```

#### filter 遍历 + indexOf()

```js
function unique(array) {

  return array.filter((elem, index) => {
    // indexOf 总是返回找到的第一个元素的下标
    // indexOf 返回的下标不等于当前元素的下标即为重复元素
    return array.indexOf(elem) === index
  })
}

unique(randoms())
```

### 思路三：利用特殊数据的不重复性

#### set 数据结构

```js
function unique(array) {

  // 创建一个 set 数据结构，set 中的值都是唯一的
  // const set = new Set()

  // set 不会添加重复的值
  // array.forEach((elem) => set.add(elem))

  // 或者可以直接使用数组创建 set
  const set = new Set(array)

  return [...set]
}

unique(randoms())
```

#### map 数据结构

```js
function unique(array) {

  // 创建一个 map 数据结构
  const map = new Map()

  array.forEach((elem) => {
    // 使用 map.has() 判断元素是否重复
    // if (!map.has(elem)) {
    //   map.set(elem, 'unique')
    // }

    // 也可以直接利用 map 键值不重复的特性
    map.set(elem, elem)
  })

  return [...map.keys()]
}

unique(randoms())
```

#### obj 数据结构

```js
function unique(array) {

  // 创建一个 obj 数据结构，obj 的键具有唯一性
  let obj = {}

  array.forEach((elem) => {
    // 使用对象的 hasOwnProperty 方法判断属性是否重复
    // if (!obj.hasOwnProperty(typeof elem + elem)) {
    //   // 因为对象的键值会默认转为字符串类型
    //   // typeof elem + elem 是用于区分类型不同字面量相同的值，比如 1 和 '1'
    //   obj[typeof elem + elem] = elem
    // }

    // 也可以直接利用 obj 键值不重复的特性
    obj[typeof elem + elem] = elem
  })

  return Object.values(obj)
}

unique(randoms())
```



