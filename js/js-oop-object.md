## 对象创建

js 中创建对象的方式有：

1. 以对象字面量的形式（工厂模式）
2. 通过 new 构造函数的形式
3. 通过 new class 的形式
4. Obejct.create(proto, [descriptor]) 方法
5. Object.setPrototypeOf(obj, proto) 方法

```js
// 对象字面量
function Person() {
  return {name: 'ace'}
}

// new 运算符
function Person() {
  this.name = 'ace'
}
new Person()

class Person {
  constructor() {
    this.name = 'ace'
  }
}
new Person()

// 原型为空的对象
Object.create(null, {name: {value: 'ace'}})

// 原型为空的对象
Object.setPrototypeOf({name: 'ace'}, null)
```

## 对象拷贝

引用类型在赋值的过程中实际传递的是地址，这就导致如果一方修改了对象，所有引用的变量都会改变。

在开发中不希望出现这种情况，通常使用对象的深浅拷贝来解决这个问题。

```js
const o1 = { foo: 1 }
const o2 = o1
o1.foo = 10
o2 // { foo: 10 }
```

### 浅拷贝

对象的浅拷贝是将对象原始类型的属性复制到一个新的对象中，引用类型的属性复制的仍然是地址。

实现浅拷贝的方法通常有：

1. 展开运算符 ...
2. Object.assign() 方法
3. Object.create() 方法

#### 展开运算符 ...

```js
const o1 = {foo: 1, bar: {baz: 2}}
const o2 = {...o1}

o2 // {foo: 1, bar: {baz: 2}}

o1.foo = 10
o1.bar.baz = 20

o1 // {foo: 10, bar: {baz: 20}}
o2 // {foo: 1, bar: {baz: 20}}
```

#### Object.assign()

```js
const o1 = {foo: 1, bar: {baz: 2}}
const o2 = Object.assign({}, o1)

o2 // {foo: 1, bar: {baz: 2}}

o1.foo = 10
o1.bar.baz = 20

o1 // {foo: 10, bar: {baz: 20}}
o2 // {foo: 1, bar: {baz: 20}}
```

#### Object.create()

```js
const o1 = {foo: 1, bar: {baz: 2}}
const o2 = Object.create(Object.getPrototypeOf(o1), Object.getOwnPropertyDescriptors(o1))

o2 // {foo: 1, bar: {baz: 2}}

o1.foo = 10
o1.bar.baz = 20

o1 // {foo: 10, bar: {baz: 20}}
o2 // {foo: 1, bar: {baz: 20}}
```

展开运算符和 Object.assign() 的缺陷是不能复制**不可枚举**的属性以及**原型链**上的属性，Object.create() 可以弥补这两个缺陷。

#### 手写实现

```js
// 缺陷：不能复制 symbol 类型的属性
function shallowClone(source) {
  // 原始类型直接返回
  if (typeof source !== 'object' || source == null)
    return source
  
  // 区分数组和对象
  const target = Array.isArray(source) ? [] : {}
  
  for (let prop in source) {
    // in 会包含原型上的属性
    if (source.hasOwnProperty(prop)) {
      target[prop] = source[prop]
    }
  }
  return target
}
```

### 深拷贝

对象的深拷贝是将对象原始类型和引用类型的属性都复制到一个新的对象中，相当于产生了一个新的对象。

实现深拷贝的方法通常有：

1. JSON.parse(JSON.stringify())
2. 利用递归实现
3. [lodash 的深拷贝函数](https://lodash.com/docs#cloneDeep)

#### JSON.parse(JSON.stringify())

```js
const o1 = {foo: 1, bar: {baz: 2}}
const o2 = JSON.parse(JSON.stringify(o1))

o2 // {foo: 1, bar: {baz: 2}}

o1.foo = 10
o1.bar.baz = 20

o1 // {foo: 10, bar: {baz: 20}}
o2 // {foo: 1, bar: {baz: 2}}
```

该方法有一些缺陷：

1. 会忽略函数、undefined 值、symbol 值
2. 会将 NaN、±Infinity 值转为 null
3. 拷贝日期(Date)对象会变为字符串
4. 拷贝正则(RegExp)对象会变为空对象
5. 无法拷贝不可枚举的属性
6. 无法拷贝原型链上的属性
7. 无法拷贝循环引用的对象

```js
const o1 = {
  obj: {foo: 'hello'},
  arr: [1, [2], 3],
  func: function () {return 1}, // 忽略该属性
  udf: undefined, // 忽略该属性
  sym: Symbol('sym'), // 忽略该属性
  nan: NaN, // 属性值转为 null
  inf: Infinity, // 属性值转为 null
  date: new Date, // 属性值转为日期字符串
  reg: /123/ // 属性值转为空对象
}

Object.defineProperty(o1, 'bar', {
  value: 'world',
  enmurable: false
})

Object.setPrototypeOf(o1, {baz: 'hi'})

const o2 = JSON.parse(JSON.stringify(o1))
```

```js
// 循环引用：对象的属性直接或间接地引用了自身
const o1 = {foo: 1}
o1.bar = o1 // 对象属性引用对象自身

const o2 = JSON.parse(JSON.stringify(o1))
// Uncaught TypeError: Converting circular structure to JSON
```

#### 递归实现(基础版)

深拷贝需要考虑很多的边界情况，这里只实现一个简易版的深拷贝。

```js
function deepClone(source) {

  let isObj = function (obj) {
    return typeof obj === 'object' && obj !== null
  }

  if (!isObj(source))
    return 'argument is not a object'

  const target = {}
  Object.keys(source).forEach(key => {
    if (isObj(source[key])) {
      // 属性是对象的话，递归调用
      target[key] = deepClone(source[key])
    } else {
      // 属性是原始类型的话直接复制
      target[key] = source[key]
    }
  })
  return target
}
```

#### 递归实现(进阶版)

考虑尽量多的边界条件，实现一个进阶版的深拷贝。

1. 针对不可遍历的属性、symbol 属性等，使用 Reflect.ownKeys()
   1. 针对
2. 针对日期对象、正则对象，则返回一个新实例
3. 

```js
```



> 面试题：什么是浅/深拷贝？如何实现浅/深拷贝？

略...

