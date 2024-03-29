## 数据类型

js 中的数据类型分为**原始类型**(primitive)和**引用类型**(reference)，原始类型包括：

- Number
- String
- Boolean
- Null
- Undefined
- Symbol(es6)
- BigInt(es6)

其余都为引用类型，包括：

- Object
- Array
- Function

以及一些包装对象和内置对象：

- Number
- String
- Boolean
- Math
- Date
- RegExp

> 面试题：js 中的数据类型有哪些？null 是对象麽？

1. js 中的数据类型分为两大类：原始类型和引用类型
   原始类型包括 number、string、boolean、null、undefined、symbol、bigint
   引用类型包括 object、array、function 以及一些包装对象和工具对象
   原始类型的值存在放栈内存当中，引用类型的值存在在堆内存当中
2. 虽然 typeof null 返回 object，但 null 不是对象

### 原始类型 vs 引用类型

原始类型的变量存储的是**值**，引用类型的变量存储的是**地址(引用)**，地址指向内存中的一块数据。

```js
let v1 = 1
let v2 = v1
v1 = 2
v1 // 2
v2 // 1

let o1 = []
let o2 = o1
o1.push(1)
o1 // [1]
o2 // [1]
```

> 面试题：回答下面代码输出。

```js
function func(person) {
  person.age = 13
  person = {
    name: 'ace',
    age: 14
  }
  return person
}

const p1 = {
  name: 'luffy',
  age: 12
}

const p2 = func(p1)

console.log(p1) // {name: 'luffy', age: 13}
console.log(p2) // {name: 'ace', age: 14}
```

### 特殊值

#### null & undefined

null 是一个关键字，不能被赋值；

undefined 是一个挂在 window 对象上的全局属性，属性描述符被设置为不可修改不可配置，在全局作用域下不能修改，但在局部作用域下可以被覆盖。

```js
undefined in window // true
Object.getOwnPropertyDescriptor(window, undefined)
// { value: undefined, writable: false, enumerable: false, configurable: false }

// null 是关键字，赋值会报错
null = 1 // Uncaught SyntaxError: invalid assignment left-hand side

// undefined 不是关键字，能够被赋值
// 全局作用域下无法修改
undefined = 1 // 1
undefined // undefined

// 局部作用域可以被覆盖
;(function () {
  var undefined = 'foo'
  // foo string，undefined 值和类型都发生了变化
  console.log(undefined, typeof undefined)
})()
```

null 和 undefined 的区别：

1. **语法**上的区别：null 是关键字，不能被赋值；undefined 是一个属性名，可以被赋值，全局作用域下不会被修改，但局部作用域可能被修改(`void(0)`)；
2. **语义**上的区别：undefined 表示未赋值，null 表示赋值了但是值为"空"；
3. **类型转换**的区别：null 转为数值时为 0，undefined 转为数值时为 NaN。

参考链接：

- [What Does javascript:void(0); Mean?](https://www.freecodecamp.org/news/javascript-void-keyword-explained/)
- [void 运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/void)

#### NaN & Infinity

NaN 和 Infinity 是 Number 类型中的特殊值，和 undefined 一样，它们也不是关键字，是挂在 window 对象上的全局属性。

```js
typeof NaN // "number"
typeof Infinity // "number"

NaN in window // true
Infinity in window // true

Object.getOwnPropertyDescriptor(window, NaN)
// { value: NaN, writable: false, enumerable: false, configurable: false }
Object.getOwnPropertyDescriptor(window, Infinity)
// { value: Infinity, writable: false, enumerable: false, configurable: false }
```

注意，NaN 不代表某一个值，而是代表某一类值，所以 NaN 不等于自身，不能使用 == 或者 === 来判断 NaN，需要使用 isNaN() 来判断。

```js
NaN == NaN // false
NaN === NaN // false

is.NaN(NaN) // true
Number.isNaN(NaN) // true

// is.NaN() 和 Number.isNaN() 的区别：
// is.NaN() 存在隐式转换，会先将参数转为数值再进行判断
// Number.isNaN() 不存在隐式转换，直接判断更加准确
isNaN('hello') // true
Number.isNaN('hello') // false
```

## 类型检测

js 中检测数据类型的方法有3种：

1. typeof  运算符
2. instanceof 运算符
3. Object.prototype.toString.call() 方法

### typeof

缺陷：

1. 对于原始类型，除了 null 返回 object，其它都能正确判断
2. 对于引用类型，除了函数返回 function，其它都返回 object

```js
// 原始类型
typeof 10 // "number"
typeof 'hello' // "string"
typeof true // "boolean"
typeof null // "object"
typeof undefined // "undefined"
typeof Symbol('sym') // "symbol"
typeof 10n // "bigint"

// 引用类型
typeof {} // "object"
typeof [] // "object"
typeof function () {} // "function"
typeof new Number() // "object"
typeof new String() // "object"
typeof new Boolean() // "object"
```

### instanceof

缺陷：

1. 不能判断原始类型的值，只能判断引用类型的值

2. 不能正确判断原型为 null 的对象

原理：检查构造函数的 prototype 属性是否在实例对象的原型链上（参考 new 运算符）

```js
function Person() {}

const p1 = new Person()
p1 instanceof Person // true

const p2 = Object.create(Person.prototype)
p2 instanceof Person // true

'hello' instanceof String // false
new String('hello') instanceof String // true
```

当一个对象的原型为 null 时，instanceof 运算符会出现**判断失真**的情况。

```js
// 创建一个原型为 null 的对象
const obj = Object.create(null)

// Object.prototype 不在 obj 的原型链上
obj instanceof Object // false
typeof obj // "object"
```

通过 Symbol.hasInstance 可以定义 instanceof 运算符在某个类上的行为。

```js
class MyString {
  static [Symbol.hasInstance](value) {
    return typeof value === 'string'
  }
}

'hello' instanceof String // false
'hello' instanceof MyString // true
```

> 面试题：instanceof 运算符判断的原理是什么？请实现一个 instanceof 运算符。

```js
function _instanceof(instance, constructor) {

  // 如果是原始类型直接返回 false
  if (typeof instance !== 'object' || instance === null)
    return false

  // 获取实例对象的原型对象
  let proto = Object.getPrototypeOf(instance)
  while (proto) {
    // 判断构造函数的原型和实例对象的原型是否相等，找到了就返回 true
    if (proto === constructor.prototype)
      return true
    else
      // 没找到再查找原型对象的原型，直到找到原型链的顶端 null
      proto = Object.getPrototypeOf(proto)
  }

  // 原型链上都没找到，返回 false
  return false
}

function Person() {}
const p = new Person()

_instanceof(p, Person) // true
_instanceof(p, Object) // true
```

### Object.prototype.toString.call()

缺陷：

1. 统一返回格式为 “[object Xxx]” 的字符串，Xxx 即数据类型且首字母大写（typeof 返回的都是小写）
2. 不能区分原始类型和包装对象，因为调用过程中存在隐式转换，会将原始类型的值转为包装对象

```js
// 原始类型
Object.prototype.toString.call(10) // "[object Number]"
Object.prototype.toString.call('hello') // "[object String]"
Object.prototype.toString.call(true) // "[object Boolean]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(Symbol('sym')) // "[object Symbol]"
Object.prototype.toString.call(10n) // "[object BigInt]"

// 引用类型
Object.prototype.toString.call({}) // "[object Object]"
Object.prototype.toString.call([]) // "[object Array]"
Object.prototype.toString.call(function () {}) // "[object Function]"
Object.prototype.toString.call(new Number()) // "[object Number]"
Object.prototype.toString.call(new String()) // "[object String]"
Object.prototype.toString.call(new Boolean()) // "[object Boolean]"
Object.prototype.toString.call(new Date()) // "[object Date]"
Object.prototype.toString.call(/123/) // "[object RegExp]"
Object.prototype.toString.call(Math) // "[object Math]"
Object.prototype.toString.call(JSON) // "[object JSON]"
Object.prototype.toString.call(document) // "[object HTMLDocument]"
Object.prototype.toString.call(window) // "[object Window]"
```

实现一个全局通用的判断数据类型的方法：

```js
function getType(value) {
  let type = typeof value
  if (type !== 'object')
    return type
  return Object.prototype.toString.call(value).replace(/^\[object (\S+)\]$/, '$1')
}
```

## 类型转换

js 中不同的数据类型之间可以相互进行转换，类型转换包括强制类型转换和隐式类型转换，隐式类型转换是以强制类型转换为基础的。

### 强制类型转换

强制类型转换包括 Number()、String()、Boolean() 以及 parseInt()、parseFloat()、toString() 等方法。

#### Number()

- number 转 number，返回自身
- string 转 number
  - 纯数字字符串(包含+/-)，转为对应数值
  - 空字符串转为 0
  - 二(0b)八(0o)十六(0x)进制字符串，转为对应十进制数值
  - 浮点数(.)或者包含科学计数法(e)的字符串，转为对应浮点数
  - 其余字符串均转为 NaN
- boolean 转 number，true 转为 1，false 转为 0
- null 转 number，为 0
- undefined 转 number，为 NaN
- symbol 转 number，报错

```js
Number(1) // 1

Number('+1') // 1
Number('0b10') // 2
Number('0o10') // 8
Number('0x10') // 16
Number('.1') // 0.1
Number('1.23e4') // 12300

Number(true) // 1
Number(false) // 0

Number(null) // 0
Number(undefined) // NaN
Number(Symbol('sym')) // Uncaught TypeError: can't convert symbol to number
```

#### String()

全都转为对应的字符串形式。

```js
String(-1) // '-1'
String(0b10) // '2'
String(.12) // '0.12'
String(1.2e3) // '1200'

String(true) // 'true'
String(false) // 'false'

String(null) // 'null'
String(undefined) // 'undefined'
String(Symbol('sym')) // 'Symbol(sym)'
```

#### Boolean()

除了 0、NaN、''、null、undefined 转为 false，其余都转为 true，包括 {}、[]、new Boolean(false)。

```js
Boolean(0) // false
Boolean(NaN) // false
Boolean('') // false
Boolean(null) // false
Boolean(undefined) // false

Boolean({}) // true
Boolean([]) // true
Boolean(new Boolean(false)) // true
```

### 隐式类型转换

算术运算符(+、-、*、/)、关系运算符(>、<、>=、<=)、逻辑运算符(&&、||、!)以及 if/while 的条件判断，都会出现隐式类型转换。

#### 算术运算符

算术运算符除了**加法运算符**会有"函数重载"现象，其它运算符都会将操作数转换为**数值**进行运算。

> 面试题：请回答下列代码打印结果。

```js
if (1 + 5 * "3" == 16) {
  console.log("pass"); // pass
} else {
  console.log("not pass");
}
// 5 * '3' => 15
// 1 + 15 => 16
// 16 == 16
```

##### 加法运算符(+)

转换规则：

1. 作为双目运算符（加法运算符）：
   1. 如果至少存在一个字符串，则将另一个操作数转为字符串，进行字符串拼接运算
   2. 如果不存在字符串，则将两个操作数转为数值，进行加法运算
2. 作为单目运算符（正号运算符）：
   1. 将操作数转为数值类型

```js
'1' + null // '1null'
1 + null // 1
'1' + undefined // '1undefined'
1 + undefined // NaN
'1' + 2 // '12'
null + true // 1
false + 1 // 1
```

> 面试题：请回答 {} + {} 的输出结果。

1. 第一对花括号会被当作语句块被引擎忽略，运行后的代码为 +{}
2. 引用类型要先转为原始类型(valueOf, toString)，运行后的代码为 +'[object Object]'
3. \+ 运算符会将操作数转为数值类型，即 +'[object Object]' => NaN
4. 要想不忽略第一对花括号，用括号包裹就会被视为对象

```js
{} + {} // NaN，等价于 +{}
({}) + {} // "[object Object][object Object]"
```

#### 关系运算符

关系运算符(>、<、>=、<=)的转换规则：

1. 如果两个操作数都为字符串，那会从左到右依次比较每个字符的 Unicode 大小
2. 如果两个操作数不全为字符串，那会将两个操作数都转为数值进行比较

```js
'101' > '11' // false
'101' > 11 // true
```

##### 相等运算符(==)

[转换规则](https://felix-kling.de/js-loose-comparison/)：

1. 判断两者数据类型是否相同，相同直接比大小，不同进行类型转换
2. 判断是否在对比 null 和 undefined，是的话返回 true；否则只要有一个操作数为 null/undefined，都返回 false
3. 判断是否在对比 string 和 number 类型，是的话将 string 转为 number 类型再进行判断
4. 判断是否存在 boolean 类型，是的话将 boolean 转为 number 类型再进行判断
5. 判断是否存在 object 类型，且另一方为 string、number 或者 symbol 类型，是的话将 object 类型转为对应的原始类型再进行判断

```js
null == undefined // true，规则2
null == 0 // false，规则2
undefined == NaN // false，规则2
null == false // false，规则2
undefined == false // false，规则2
null == '' // false，规则2

'' == 0 // true，规则3
'123' == 123 // true，规则3

0 == false // true，规则4
'1' == true // true，规则4，规则3

const o = {
  value: 0,
  valueOf: function () {
    return ++this.value
  }
}
o == 1 && o == 2 && o == 3 // true
```

> 面试题：请回答 [] == ![] 的输出结果。

1. ! 运算符的优先级高于 == 运算符，运行后的代码为 [] == false
2. 存在布尔值，要将布尔值转为数值，运行后的代码为 [] == 0
3. 存在引用类型，要将引用类型转为对应的原始类型(valueOf, toString)，[] => [] => ''，运行后的代码为 '' == 0
4. 因为在对比字符串和数值，要将字符串转为数值，运行后的代码为 0 == 0，返回 true

```js
[] == ![] // true
```

> 面试题：请回答 {} == !{} 的输出结果。

1. ! 运算符的优先级高于 == 运算符，运行后的代码为 {} == false
2. 存在布尔值，要将布尔值转为数值，运行后的代码为 {} == 0
3. 存在引用类型，要将引用类型转为对应的原始类型(valueOf, toString)，{} => {} => '[object Object]'，运行后的代码为 '[object Object]' == 0
4. 因为在对比字符串和数值，要将字符串转为数值，运行后的代码为 NaN == 0，返回 false

```js
// 第一对花括号会被当作语句块忽略
{} == !{} // firefox 下直接报错，chrome 下返回 false，排除错误需要加上括号
({}) == !{} // false
```

##### == vs === vs Object.is()

相等运算符 ==、严格相等运算符 === 和 Object.js() 的区别：

- 相等运算符 == 存在隐式转换，类型不同时先转为相同类型，再进行比较
- 严格相等运算符 === 不存在类型转换，类型不同直接不相等
- Object.is() 是 es6 新增，行为与 === 基本一致，只有两处不同
  - NaN 与自身相等
  - +0 不等于 -0

```js
NaN === NaN // false
+0 === -0 // true

Object.is(NaN, NaN) // true
Object.is(+0, -0) // false
```

![equal](js-type.assets/equal.png)

#### 逻辑运算符

逻辑运算符会将操作数转换为布尔值进行运算，除了逻辑非 ! 直接返回布尔值，逻辑与 && 和逻辑或 || 返回的是表达式的值。

> 面试题：请回答下列代码打印结果。

```js
console.log(!!" " + !!"" - !!false); // 1
// !!" " => true
// !!"" => false
// !!false => false
// true + false => 1
// 1 - false => 1
```

```js
console.log(window.a + "" || (window.a = "1")); // "undefined"
```

```js
if (typeof a && -true + +undefined + "") {
  console.log("pass"); // pass
} else {
  console.log("not pass");
}
// typeof a => 'undefined'
// -true => -1
// +undefined => NaN
// -1 + NaN => NaN
// NaN + '' => 'NaN'
// 'undefined' && 'NaN' => 'NaN'
// if ('NaN') => true
```

#### Object

转换规则：

1. 如果有 [Symbol.toPrimitive] 方法，优先调用再返回
2. 否则调用 valueOf()，如果返回原始类型，则返回
3. 否则调用 toString()，如果返回原始类型，则返回
4. 如果都没有返回原始类型，则报错

```js
const o = {
  value: 1,
  valueOf() {
    return 2
  },
  toString() {
    return '3'
  },
  [Symbol.toPrimitive]() {
    return 4
  }
}

o + 1 // 5
10 + {} // '10[object Object]'
[1, 2, undefined, 4, 5] + 10 // '1,2,4,510'
```

### 巧用隐式转换

最快将一个值转为**数值**的方法是使用 +。

```js
+'' // 0
+'1' // 1
+true // 1
+false // 0
+null // 0
+undefined // NaN
```

最快就一个值转为**字符串**的方法是加上一个空字符串。

```js
1 + '' // '1'
true + '' // 'true'
null + '' // 'null'
undefined + '' // 'undefined'
NaN + '' // 'NaN'
[] + '' // ''
({}) + '' // '[object Object]'
```

最快将一个值转为**布尔值**的方法是使用 !!。

```js
!!0 // false
!!1 // false
!!NaN // false
!!Infinity // true
!!'' // false
!!'js' // true
!!null // false
!!undefined // false
```

