## 数据类型

js 中的数据类型分为原始类型(primitive)和引用类型(reference)，原始类型包括：

- Number
- String
- Boolean
- Null
- Undefined
- Symbol
- BigInt

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

> 面试题：js 中的数据类型有哪些？`null` 是对象麽？

1. 略
2. `null` 不是对象

### 原始类型 vs 引用类型

原始类型的变量存储的是值，引用类型的变量存储的是地址，地址指向内存中的一块数据。

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

> 面试题：函数参数是引用类型的变量，回答代码输出。

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

1. `typeof ` 运算符
2. `instanceof` 运算符
3. `Object.prototype.toString.call()` 方法

### typeof

缺陷：

1. 对于原始类型，除了 `null` 返回 `object`，其它都能正确判断
2. 对于引用类型，除了函数返回 `function`，其它都返回 `object`

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

缺陷：不能判断原始类型的值，只能判断引用类型的值

原理：检查构造函数的 `prototype` 属性是否在实例对象的原型链上（参考 `new` 运算符）

```js
function Person() {}
const p = new Person()

p instanceof Person // true
Person.prototype.isPrototypeOf(p) // 等同于 instanceof 运算符

'hello' instanceof String // false
new String('hello') instanceof String // true
```

当一个对象的原型为 `null` 时，`instanceof` 运算符会出现判断失真的情况。

```js
// 创建一个原型为 null 的对象
const obj = Object.create(null)

// Object.prototype 不在 obj 的原型链上
obj instanceof Object // false
typeof obj // "object"
```

通过 `Symbol.hasInstance` 可以定义 `instanceof` 运算符在某个类上的行为。

```js
class MyString {
  static [Symbol.hasInstance](value) {
    return typeof value === 'string'
  }
}
'hello' instanceof MyString // true
new String('hello') instanceof MyString // false
```

> 面试题：实现一个 `instanceof` 运算符。

```js
function _instanceof(instance, constructor) {
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

