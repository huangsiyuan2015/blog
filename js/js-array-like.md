## 类数组对象

js 中常见的类数组对象(array-like object)有：

1. arguments 对象
2. HTMLCollection 对象（getElementsByTagName/ClassName/Name 获取）
3. NodeList 对象（querySelector 获取）

类数组对象的特征：

1. 具有数值下标和 length 属性的对象
2. 不具备 Array.prototype 上的方法

类数组对象不是真正的数组，所以没有数组实例的方法，但可以通过 call、apply 方法借用数组实例的方法。

```js
let arrLike = {
  0: 'js',
  1: 'vue',
  length: 2
}

Array.prototype.push.call(arrLike, 'react', 'angular') // 4
arrLike // { 0: "js", 1: "vue", 2: "react", 3: "angular", length: 4 }
```

## 类数组对象转为数组

### es6

#### Array.from()

```js
let arrLike = {
  0: 'js',
  1: 'vue',
  2: 'react',
  length: 3
}

Array.from(arrLike) // [ "js", "vue", "react" ]
```

#### 展开运算符

```js
function f() {
  return [...arguments]
}
f('foo', 'bar', 'baz') // [ "foo", "bar", "baz" ]

function g(...args) {
  return args
}
g('foo', 'bar', 'baz') // [ "foo", "bar", "baz" ]
```

### es5

#### Array.prototype.slice.call()

```js
let arrLike = {
  0: 'js',
  1: 'vue',
  2: 'react',
  length: 3
}

Array.prototype.slice.call(arrLike) // [ "js", "vue", "react" ]
[].slice.call(arrLike) // [ "js", "vue", "react" ]
```

#### Array.prototype.concat.apply()

```js
let arrLike = {
  0: 'js',
  1: 'vue',
  2: 'react',
  length: 3
}

Array.prototype.concat.apply([], arrLike) // [ "js", "vue", "react" ]
[].concat.apply([], arrLike) // [ "js", "vue", "react" ]
```

> 面试题：某公司 1 到 12 月份的销售额存在一个对象里面，如下：
>
> {1:222, 2:123, 5:888}，
>
> 请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null]。

```js
let obj = { 1: 222, 2: 123, 5: 888 }

Array.from({ length: 12 }).map((elem, index) => {
  return obj[index + 1] || null
})
```

