## 高阶函数(higher-order function)

### map

`map` 方法用来生成一个新数组。遍历数组将每个元素操作后映射到一个新的数组中。

```js
[1, 2, 3].map(n => n + 1) // [2, 3, 4]
```

> 面试题：['1', '2', '3'].map(parseInt) 的打印结果。

`map(callback(elem, index, array))` 方法向回调函数传递三个参数，作为回调函数的 `parseInt(str, radix)` 方法接受两个参数：

1. `parseInt('1', 0)` => 1
2. `parseInt('2', 1)` => `NaN`
3. `parseInt('3', 2)` => `NaN`

打印结果为：`[1, NaN, NaN]`，如果想获取期望的结果，代码应修改为：

```js
['1', '2', '3'].map(elem => parseInt(elem)) // [1, 2, 3]
```

### filter

`filter` 方法也是用来生成一个新数组。遍历数组时将返回值为 `true` 的元素放入新数组。

```js
[1, 2, 5, 6].filter(n => n % 2) // [1, 5]
```

### reduce

`reduce` 方法可以将数组中的元素通过回调函数最终转换为一个值，比如实现一个累加。

```js
[1, 2, 3].reduce((acc, crt) => acc + crt, 0) // 6
```

利用 `reduce` 实现 `map` 方法：

```js
[1, 2, 3].map(n => n * 2) // [2, 4, 6]

[1, 2, 3].reduce((acc, crt) => {
  acc.push(crt * 2)
  return acc
}, []) // [2, 4, 6]
```

