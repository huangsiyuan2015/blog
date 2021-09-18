## 数组展开

数组展开也叫数组扁平化处理，即将一个多维嵌套数组展开成一个一维数组。

### forEach 遍历 + 递归

```js
let array = [1, [2, [3, 4, 5]]]

function flatten(array) {

  // 创建一个数组，用来保存展开的元素
  let result = []

  array.forEach((elem) => {
    // 遍历原数组，判断元素是否为数组，是的话就递归调用
    if (Array.isArray(elem)) {
      result.push(...flatten(elem))
      // result = result.concat(flatten(elem))
    } else {
      result.push(elem)
    }
  })

  return result
}

flatten(array) // [ 1, 2, 3, 4, 5 ]
```

### reduce 遍历 + 递归

```js
let array = [1, [2, [3, 4, 5]]]

function flatten(array) {

  return array.reduce((pre, cur) => {
    // 注意要返回合并后的数组
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
  }, [])
}

flatten(array) // [ 1, 2, 3, 4, 5 ]
```

### some() + 展开运算符

```js
let array = [1, [2, [3, 4, 5]]]

function flatten(array) {

  while (array.some((elem => Array.isArray(elem)))) {
    // 注意要返回展开后的数组，否则会陷入死循环
    array = [].concat(...array)
  }

  return array
}

flatten(array) // [ 1, 2, 3, 4, 5 ]
```

### flat()

```js
let array = [1, [2, [3, 4, 5]]]

function flatten(array) {

  // flat 接收一个参数表示要展开的层数
  // 对于不确定的层数可以使用 Infinity
  return array.flat(Infinity)
}

flatten(array) // [ 1, 2, 3, 4, 5 ]
```

### toString() + split()

缺陷：展开过程存在类型转换，不适用于某些数据类型，比如：null、{} ...

```js
let array = [1, [2, [3, 4, 5]]]

function flatten(array) {

  // toString 默认展开所有元素
  // 注意此时返回的元素都会变为字符串类型
  return array.toString().split(',').map((num) => Number(num))
}

flatten(array) // [ 1, 2, 3, 4, 5 ]
```

### JSON + 正则表达式

缺陷：JSON.stringify() 会过滤掉某些数据类型，正则表达式会过滤掉 '['、']' 元素。

```js
let array = [1, [2, [3, 4, 5]]]

function flatten(array) {

  let str = JSON.stringify(array)
  str = str.replace(/(\[|\])/g, '') // 去掉所有的中括号
  str = '[' + str + ']' // 最外层再包裹一层中括号
  return JSON.parse(str)
}

flatten(array) // [ 1, 2, 3, 4, 5 ]
```

