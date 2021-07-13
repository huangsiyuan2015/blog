## 提升(hoisting)

js 中的**提升**(hoisting)是指变量还未声明就可以使用，这种情况就叫做提升，并且提升的是**声明**。

```js
console.log(a) // undefined
var a = 1

// 相当于
var a
console.log(a) // undefined
a = 1
```

再看一个例子。

```js
var a = 1
var a
console.log(a) // 1，不是 undefined

// 相当于
var a
var a
a = 1
console.log(a) // 1
```

不仅变量声明会被提升，函数声明也会被提升，并且函数提升优先于变量提升。

```js
console.log(a) // function a() {}
function a() {}
var a = 1 // 变量虽然后声明，但并不会覆盖同名函数
```

综上所述，使用 `var` 声明的变量会被提升到作用域的头部。

使用 es6 `let` 和 `const` 声明的变量不存在提升，变量必须先声明后使用。

```js
var a = 1
let b = 2
const c = 3

// let const 声明的变量不会挂载到 window 上
console.log(window.a) // 1
console.log(window.b) // undefined
console.log(window.c) // undefined

// let const 声明的变量必须先声明后使用，否则报错
function test() {
  console.log(a)
  let a
}
test() // Uncaught ReferenceError: can't access lexical declaration 'a' before initialization
```



> 面试题：var 和 let、const 的区别。

1. `var` 声明的变量存在提升，而 `let`、`const` 声明的变量不存在提升
2. `var` 在全局作用域下声明的变量会被挂载到全局对象 `window` 上，而 `let`、`const` 不会
3. `let` 声明的变量可以多次赋值，而 `const` 声明的变量只能赋值一次



> 面试题：回答下面代码输出。

```js
show()
var show = function () { console.log(2) }
function show() { console.log(1) }
show()

// 相当于
function show() { console.log(1) }
var show
show() // 1，函数提升优先于变量提升，所以不会被覆盖
show = function () { console.log(2) }
show() // 2
```

