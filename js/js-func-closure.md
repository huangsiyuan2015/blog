## 作用域链和闭包

### 作用域

作用域是指变量能够被访问到的范围，es6 之前 js 只有全局作用域和函数作用域，es6 之后新增块级作用域。

#### 全局作用域

编程语言中，变量一般都会分为全局变量和局部变量，定义在函数外部的变量，一般情况下都是全局变量。

```js
var globalVal = 'global' // 全局变量

function getVal() {

  console.log(globalVal) // "global"
}

getVal() // "global"
console.log(globalVal) // "global"
```

js 中的全局变量都挂载在 window 对象上，未声明的变量被赋值会默认为全局变量挂载在 window 对象上。

```js
function setVal() {

  globalVal = 'global' // 默认为全局变量
}

setVal()
console.log(globalVal) // "global"
console.log(window.globalVal) // "global"
```

#### 函数作用域

定义在函数内部的变量称为局部变量，因为只能在函数内部访问到它，所以它的作用域也被称为函数作用域。

```js
function getVal() {

  var localVal = 'local' // 局部变量
  console.log(localVal)
}

getVal() // "local"
console.log(localVal) // ReferenceError: localVal is not defined
```

#### 块级作用域

es6 新增块级作用域，即使用 let、const 关键字声明的变量只能在代码块中访问，变量必须先声明后使用。

```js
// 代码块表示使用 {} 包裹起来的部分
// 还有 if 语句块、while 语句块等等
{
  console.log(localVal) // ReferenceError: can't access lexical declaration 'localVal' before initialization
  let localVal = 'local'
  console.log(localVal) // "local"
}

console.log(localVal) // ReferenceError: localVal is not defined
```

使用 var 声明的变量就不存在块级作用域，并且 var 声明的变量可以在声明之前就能访问(变量提升)。

```js
{
  console.log(localVal) // undefined
  var localVal = 'local'
  console.log(localVal) // "local"
}

console.log(localVal) // "local"
```

### 词法作用域 vs 动态作用域

js 采用词法作用域(lexical scoping)，也就是静态作用域。静态作用域是指函数的作用域在函数定义的时候就确定了。

与静态作用域相对的是动态作用域，动态作用域是指函数的作用域在函数调用时才确定。

```js
var value = 1

function foo() {
  console.log(value)
}

function bar() {
  var value = 2
  foo()
}

bar() // 1
```

假设 js 采用静态作用域，bar() 的输出结果就是 1，因为 foo 函数的作用域在函数定义时就确定了；

假设 js 采用动态作用域，bar() 的输出结果就是 2，因为 foo 函数的作用域在函数调用时才能确定。

```bash
// bash 使用的就是动态作用域
value=1

function foo() {
  echo $value
}

function bar() {
  local value=2
  foo
}

bar // 2
```

> 练习题：回答下面代码的输出。

```js
var scope = "global scope"

function checkscope() {
  var scope = "local scope"
  function f() {
    return scope
  }
  return f()
}

checkscope() // "local scope"
```

```js
var scope = "global scope"

function checkscope() {
  var scope = "local scope"
  function f() {
    return scope
  }
  return f
}

checkscope()() // "local scope"
```

### 作用域链

作用域是指变量能够被访问到的范围，当访问一个变量时，会先在当前作用域内进行查找；如果当前作用域内没找到，就会向父级作用域进行查找；如果父级作用域内没找到，就会继续向上层的父级作用域进行查找，这样就形成了一条作用域链，作用域链的顶端是全局作用域。

```js
// 变量 val 的查找过程：
// 先在 inner 函数内部查找，未找到向父级作用域查找
// 在 outer 函数内部查找，未找到向父级作用域查找
// 在 {} 块中查找，未找到向父级作用域查找
// 在 全局 中查找，找到 val 变量
let val = 'global'
{
  // let val = 'block'
  (function outer() {

    // let val = 'outer'
    (function inner() {
      
      // let val = 'inner'
      console.log(val)
    })()
  })()
}
```

### 闭包

闭包就是一个函数，是一个可以访问到其它函数内部变量的函数。闭包的本质就是当前函数存在对父级作用域的引用。

通常情况下，函数内部的变量外部无法访问，但使用闭包就可以巧妙地从外部访问函数内部的变量。

```js
function outer() {
  
  let localVal = 'local'

  function inner() {
    console.log(localVal)
  }
  
  return inner
}

outer()() // "local"
```

闭包也不一定总是要**返回**一个函数，只要存在对父级作用域的引用即可。

```js
let outer

function f() {
  
  let localVal = 'local'
  
  outer = function () {
    console.log(localVal)
  }
}

f()
outer() // "local"
```

> 面试题：下面代码的输出结果是什么？如何修改以获得期望的结果？

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```

1. setTimeout 方法是异步执行的，会等到同步代码执行完即 for 循环执行完后才会执行，此时 i 的值已经自增为了 6，所以打印结果是 5 个 6
2. 回调函数 timer 中存在对父级作用域的引用，即对变量 i 的引用，但是父级作用域为全局作用域(var)，无法保存每次循环时 i 的值
3. 可以使用块级作用域、闭包或者 setTimeout 的第三个参数来解决这个问题

```js
// 第一种，使用 let 关键字
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}

// 第二种，使用闭包
for (var i = 1; i <= 5; i++) {
	(function (i) {
    setTimeout(function timer() {
      console.log(i)
    }, i * 1000)
  })(i)
}

// 第三种，使用 setTimeout 的第三个参数
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer(i) {
    console.log(i)
  }, i * 1000, i)
}
```

