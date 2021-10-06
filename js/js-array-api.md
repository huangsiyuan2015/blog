## 数组构造

js 中构造数组的方法有：

1. 数组字面量
2. Array() 构造函数
3. Array.of() 方法
4. Array.from() 方法

### 数组字面量

```js
let arr = [1, 2, 3] // 指定数组元素
arr // [1, 2, 3]

arr = []
arr.length = 3 // 指定数组长度，数组元素为 empty
arr // [ <3 empty slots> ]
```

### Array() 构造函数

```js
// 参数长度大于 1，会被视为元素填充到数组
new Array(1, 2, 3) // [ 1, 2, 3 ]
// 和使用 new 操作符的效果一样
Array(1, 2, 3) // [ 1, 2, 3 ]

// 参数长度为 1 且为数值，会被视为数组长度，否则会被视为元素填充
new Array(3) // [ <3 empty slots> ]
new Array('x') // [ "x" ]
// 和使用 new 操作符的效果一样
Array(3) // [ <3 empty slots> ]
Array('x') // [ "x" ]
```

### Array.of() 方法

```js
// Array.of() 接收的参数全都填充为数组元素
Array.of(1, 2, 3) // [ 1, 2, 3 ]

// 和 Array() 的唯一区别是对单个数值参数的处理
Array.of(3) // [ 3 ]
Array(3) // [ <3 empty slots> ]
```

### Array.from() 方法

```js
// Array.from() 用来快捷地将类数组对象转为数组
Array.from({
  0: 'x',
  1: 'y',
  2: 'z',
  length: 3
}) // [ "x", "y", "z" ]

// 还可以接收回调函数处理新数组的元素
Array.from({
  0: 'x',
  1: 'y',
  2: 'z',
  length: 3
}, elem => elem.repeat(3)) // [ "xxx", "yyy", "zzz" ]
```

## 数组检测

```js
let arr = []

// instanceof 运算符
arr instanceof Array // true

// Array 构造函数
arr.constructor === Array // true

// Object.prototype.isPrototypeOf() 方法
Array.prototype.isPrototypeOf(arr) // true

// Object.getPrototypeOf() 方法
Object.getPrototypeOf(arr) === Array.prototype // true

// Object.prototype.call() 方法
Object.prototype.toString.call(arr) === '[object Array]' // true

// es6 新增 Array.isArray() 方法
Array.isArray(arr) // true
```

> 面试题：如何判断一个变量是否为数组？

略...

## 数组常用方法

js 中数组常用的方法可以分为：

1. 改变原数组的方法
2. 不改变原数组的方法
3. 数组遍历的方法

### 改变原数组的方法

js 中改变原数组的方法可以分为：

1. 模拟栈和队列的方法：push、pop、shift、unshift
2. 排序相关的方法：sort、reverse
3. 操作数组元素的方法：splice、fill、copyWithin

```js
// 模拟栈和队列的方法
let array = ['vue', 'react']

// 注意：可以 push 多个元素，但只会 pop 一个元素
array.push('js') // 3，注意返回值是新数组的元素个数
array // [ "vue", "react", "js" ]

array.pop() // 'js'，注意返回值是弹出的数组元素
array // [ "vue", "react" ]

// 注意：可以 unshift 多个元素，但只会 shift 一个元素
array.shift() // "vue"，注意返回值是弹出的数组元素
array // [ "react" ]

array.unshift('js') // 2，注意返回值是新数组的元素个数
array // [ "js", "react" ]

// 可以利用 push 和 unshift 方法巧妙合并数组
let a1 = [1, 2, 3]
let a2 = [4, 5, 6]
let a3 = [7, 8, 9]
a1.push(...a2) // 6
a1 // [ 1, 2, 3, 4, 5, 6 ]
a3.unshift(...a2) // 6
a3 // [ 4, 5, 6, 7, 8, 9 ]
```

```js
// 排序相关的方法
let array = ['vue', 'react', 'js']

array.sort() // [ "js", "react", "vue" ]
array // [ "js", "react", "vue" ]

array.reverse() // [ "vue", "react", "js" ]
array // [ "vue", "react", "js" ]
```

```js
// 对数组元素进行增删改的方法
let array = [ "vue", "react", "js" ]

// 增
array.splice(2, 0, 'angular') // []
array // [ "vue", "react", "angular", "js" ]

// 删
array.splice(2, 1) // [ "angular" ]
array // [ "vue", "react", "js" ]

// 改
array.splice(2, 1, 'angular') // [ "js" ]
array // [ "vue", "react", "angular" ]
```

```js
// es6 新增
let array = ['vue', 'react', 'js']

array.fill('es', 1, 2) // [ "vue", "es", "js" ]
array // [ "vue", "es", "js" ]
array.fill(undefined, 0) // [ undefined, undefined, undefined ]
array // [ undefined, undefined, undefined ]

array = ['vue', 'react', 'js', 'es']

// 注意：copyWithin 方法不改变数组长度
array.copyWithin(0, 2, 4) // [ "js", "es", "js", "es" ]
array // [ "js", "es", "js", "es" ]
array.copyWithin(1, 0) // [ "js", "js", "es", "js" ]
array // [ "js", "js", "es", "js" ]
```

> 练习题：实现一个 push 方法。

```js
Array.prototype._push = function (...items) {

  let len = this.length
  let args = items.length
  
  // 数组长度超出 js 中的最大正整数，报错
  if (len + args > 2 ** 53 - 1)
    throw new TypeError("The number of array is over the max value")

  // 将参数依次放入数组元素后面
  for (let i = 0; i < args; i++) {
    this[len + i] = items[i]
  }

  return this.length
}
```

> 练习题：实现一个 pop 方法。

```js
Array.prototype._pop = function () {
  
  let len = this.length
  
  if (len === 0)
    return undefined
	
  len--
  let last = this[len]
  delete this[len] // 删除最后一个元素
  this.length = len // 删除元素后要修改数组长度
  
  return last
}
```

### 不改变原数组的方法

js 中不改变原数组的方法可以分为：

1. 处理数组相关的方法：concat、slice、join
2. 判断数组元素的方法：indexOf、lastIndexOf、includes

```js
// 注意：concat 可以合并多个元素，也可以合并多个数组
let arr1 = [1, 2]
let arr2 = arr1.concat('a', 'b', [3, 4], ['c', 'd'])
arr1 // [1, 2]
arr2 // [ 1, 2, "a", "b", 3, 4, "c", "d" ]

arr1 = ['a', 'b', 'c', 'd']
arr2 = arr1.slice(1, 3)
arr1 // [ "a", "b", "c", "d" ]
arr2 // [ "b", "c" ]

// concat 和 slice 可以巧妙地用来拷贝数组（浅拷贝）
arr1 // [ "a", "b", "c", "d" ]
arr1.concat() // [ "a", "b", "c", "d" ]
arr1.slice() // [ "a", "b", "c", "d" ]

arr1 // [ "a", "b", "c", "d" ]
arr1.join() // "a,b,c,d"
arr1.join('') // "abcd"
arr1.join('-') // "a-b-c-d"

arr1.fill('js') // [ "js", "js", "js" ]
arr1.indexOf('js') // 0
arr1.lastIndexOf('js') // 2
// 注意：indexOf 和 lastIndexOf 找不到 NaN
arr1.fill(NaN) // [ NaN, NaN, NaN ]
arr1.indexOf(NaN) // -1
arr1.lastIndexOf(NaN) // -1
// 注意：includes 方法找得到 NaN
arr1.includes(NaN) // true
```

### 数组遍历的方法

js 中数组遍历的方法可以分为：

1. 处理数组元素相关的方法：forEach、map、filter、reduce、reduceRight
2. 查找数组元素相关的方法：some、every、find、findIndex
3. 迭代器相关的方法：entries、keys、values

```js
let arr = [...'12345']

// 注意：箭头函数会忽略传递的 this 对象
arr.forEach((elem, index, arr) => {
  console.log(elem, index, arr, this)
}, {}) // undefined
// 要想传递 this 参数，使用函数声明
arr.forEach(function (elem, index, arr) {
  console.log(elem, index, arr, this)
}, {}) // undefined，注意：forEach 方法没有返回值

arr.map(elem => elem * 2) // [ 2, 4, 6, 8, 10 ]
arr // [ "1", "2", "3", "4", "5" ]

arr.filter((elem, index) => !(index % 2)) // [ "1", "3", "5" ]
arr // [ "1", "2", "3", "4", "5" ]

[1, 2, 3].reduce((pre, val, index, arr) => {
  console.log(pre, val)
  return pre + val
}, 4)
// 4 1
// 5 2
// 7 3
// 10

[1, 2, 3].reduceRight((pre, val, index, arr) => {
  console.log(pre, val)
  return pre + val
}, 4)
// 4 3
// 7 2
// 9 1
// 10
```

```js
let o = {0: 10, 1: 8, 2: 25, length: 3}
Array.prototype.every.call(o, (elem, index, arr) => elem >= 8) // true

let array = [18, 9, 10, 12];
array.some(value => value > 20) // false

[11, 14, 16, 18].find((value, index, array) => !(value % 2)) // 14，返回元素
[11, 14, 16, 18].findIndex((value, index, array) => !(value % 2)) // 1，返回下标
```

```js
let it = ['x', 'y', 'z'].entries()
it.next().value // [0, 'x']
it.next().value // [1, 'y']
it.next().value // [2, 'z']
it.next().value // undefined

it = ['x', 'y', 'z'].keys()
it.next().value // 0
it.next().value // 1
it.next().value // 2

it = ['x', 'y', 'z'].values()
it.next().value // 'x'
it.next().value // 'y'
it.next().value // 'z'
```

> 练习题：实现一个 forEach 方法。

```js
Array.prototype._forEach = function (callback, thisArg) {

  for (let i = 0; i < this.length; i++) {
    callback.call(thisArg, this[i], i, this)
  }
}
```

> 练习题：实现一个 map 方法。

```js
Array.prototype._map = function (callback, thisArg) {

  let newArr = new Array(this.length)

  for (let i = 0; i < this.length; i++) {
    newArr[i] = callback.call(thisArg, this[i], i, this)
  }

  return newArr
}
```

> 练习题：实现一个 filter 方法。

```js
Array.prototype._filter = function (callback, thisArg) {

  let newArr = new Array()

  for (let i = 0, j = 0; i < this.length; i++) {
    if (callback.call(thisArg, this[i], i, this))
      newArr[j++] = this[i]
  }

  return newArr
}
```

> 练习题：实现一个 reduce 方法

```js
Array.prototype._reduce = function (callback, initValue) {
  let accumulator
  let i = 0

  if (initValue) {
    accumulator = initValue
  } else {
    accumulator = this[i++]
  }
  
  for (; i < this.length; i++) {
    accumulator = callback.call(null, accumulator, this[i])
  }

  return accumulator
}
```

> 练习题：使用 reduce 方法实现需求。

```js
// 对数组进行处理，使其返回字符串 'one, two & three' 
let arr = [
  {name: 'one'},
  {name: 'two'},
  {name: 'three'}
]

arr.reduce((pre, val, index) => {
  if (index === 0)
    return pre + val.name + ', '
  else if (index === 1)
    return pre + val.name + ' & '
  else
    return pre + val.name
}, '') // "one, two & three"
```

> 面试题：数组的原生方法有哪些？

1. 改变原数组的方法...
2. 不改变原数组的方法...
3. 数组遍历相关的方法...