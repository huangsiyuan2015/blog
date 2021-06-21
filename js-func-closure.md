## 闭包

js 中的函数会形成闭包，闭包是由函数以及声明该函数的词法环境组合而成，该环境包含了这个闭包创建时作用域内的任何局部变量。

```js
function func() {
  let v = 'hello'
  return function () {
    return v
  }
}

let f = func()
f() // 'hello'
```

> 面试题：修改下面代码获得期望的输出结果。

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```

```js
// 解决办法有三种

// 第一种，使用 let 关键字
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}

// 第二种，使用 setTimeout 的第三个参数
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer(i) {
    console.log(i)
  }, i * 1000, i)
}

// 第三种，使用闭包
for (var i = 1; i <= 5; i++) {
	(function (i) {
    setTimeout(function timer() {
      console.log(i)
    }, i * 1000)
  })(i)
}
```

