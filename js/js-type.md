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

#### == 运算符

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

#### + 运算符

转换规则：

1. 作为双目运算符（加法运算符）：
   1. 如果至少存在一个字符串，则将另一个操作数转为字符串，进行字符串拼接运算
   2. 如果不存在字符串且一个操作数为数值，则将另一个操作数转为数值，进行加法运算
2. 作为单目运算符（正号运算符）：
   1. 将操作数转为数值类型

```js
'1' + null // '1null'
1 + null // 1
'1' + undefined // '1undefined'
1 + undefined // NaN
'1' + 2 // '12'
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

