## 对象拷贝

js 中的数据类型分为原始类型和引用类型，引用类型的变量存储的是地址，赋值给其它变量时传递的只是一个引用，这就造成当一个变量修改数据时会影响到所有的引用。为了避免这种情况，所以要对引用类型的数据进行深拷贝，即开辟一块新的内存地址用来存在数据。

### 浅拷贝

浅拷贝的方法有：

1. ... 展开运算符
2. Object.assign() 方法
3. Object.create() 方法
4. 循环实现

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
function shallowClone(source) {

  // 原始类型的参数直接返回
  if (typeof source !== 'object' || source === null)
    return source

  // 判断参数是对象还是数组
  const target = Array.isArray(source) ? [] : {}

  // 遍历复制对象的键和值
  Object.keys(source).forEach((key) => {
    target[key] = source[key]
  })

  return target
}

shallowClone([1, 2, 3]) // [1, 2, 3]
shallowClone({ foo: 'hello' }) // {foo: 'hello'}
```

### 深拷贝

深拷贝的方法有：

1. JSON.parse(JSON.stringify())
2. 递归实现

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
2. 会忽略不可枚举的属性
3. 会忽略原型链上的属性
4. 会将 NaN、±Infinity 值转为 null
5. 拷贝日期对象(Date)会变为字符串
6. 拷贝正则对象(RegExp)会变为空对象
7. 无法拷贝**循环引用**的对象(obj[key]=obj)

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

// 不可遍历的属性
Object.defineProperty(o1, 'bar', {
  value: 'world',
  enmurable: false
})

// 原型上的属性
Object.setPrototypeOf(o1, {baz: 'hi'})

const o2 = JSON.parse(JSON.stringify(o1))
o2
// {
//   obj: {foo: 'hello'},
//   arr: [1, [2] 3],
//   nan: null,
//   inf: null,
//   date: "2021-10-07T08:23:47.871Z",
//   reg: {}
// }

// 循环引用：对象的属性直接或间接地引用了自身
const obj = {}
obj.key = obj // 对象属性引用对象自身

JSON.parse(JSON.stringify(obj))
// Uncaught TypeError: Converting circular structure to JSON
```

#### 递归实现(基础版)

```js
function deepClone(source) {

  // 原始类型的参数直接返回
  if (typeof source !== 'object' || source === null)
    return source

  // 判断属性值是否还是对象
  let isObj = obj => typeof obj === 'object' && obj !== null

  // 判断参数是对象还是数组
  const target = Array.isArray(source) ? [] : {}

  // 遍历复制对象的键和值
  Object.keys(source).forEach((key) => {
    // 如果属性值还是对象，递归调用
    if (isObj(source[key])) {
      target[key] = deepClone(source[key])
    } else {
      target[key] = source[key]
    }
  })

  return target
}

deepClone({ foo: 'hello', bar: [1, 2, 3] }) // {foo: 'hello', bar: [1, 2, 3]}
deepClone([1, [2], { foo: 'hello' }]) // [1, [2], {foo: 'hello'}]
```

#### 递归实现(改进版)

缺陷优化：

1. 针对 symbol 类型和不可遍历的属性，使用 Relect.ownKeys()
2. 针对原型链上的属性，使用 Object.create() 配合 Object.getPrototypeOf()
3. 针对 Date、RegExp 类型的属性，直接返回
4. 针对循环引用的问题，利用 WeakMap(垃圾回收) 来解决

```js
function deepClone(source, hash = new WeakMap) {

  // 原始类型的参数直接返回，递归调用时函数类型也直接返回
  if (typeof source !== 'object' || source === null)
    return source

  // 递归调用时日期和正则对象也直接返回
  if (/Date|RegExp/.test(Object.prototype.toString.call(source)))
    return source

  // 使用 WeakMap 解决循环引用的问题
  if (hash.has(source)) return hash.get(source)

  // 判断属性值是否还是对象
  let isObj = obj => (typeof obj === 'object' || typeof obj === 'function')
    && obj !== null

  // 判断参数是对象还是数组，如果是对象继承原型上的属性
  let target = Array.isArray(source)
    ? []
    : Object.create(Object.getPrototypeOf(source))

  hash.set(source, target)

  // 遍历复制对象的键和值
  Reflect.ownKeys(source).forEach((key) => {
    // 如果属性值还是对象，递归调用
    if (isObj(source[key])) {
      target[key] = deepClone(source[key], hash)
    } else {
      target[key] = source[key]
    }
  })

  return target
}
```

测试代码：

```js
const o1 = {
  obj: { foo: 'hello' },
  arr: [1, [2], {}],
  func: function () { return 1 }, // 忽略该属性
  udf: undefined, // 忽略该属性
  sym: Symbol('sym'), // 忽略该属性
  nan: NaN, // 属性值转为 null
  inf: Infinity, // 属性值转为 null
  date: new Date, // 属性值转为日期字符串
  reg: /123/ // 属性值转为空对象}
}

// 不可遍历的属性
Object.defineProperty(o1, 'bar', {
  value: 'world',
  enmurable: false
})

// 原型上的属性
Object.setPrototypeOf(o1, { baz: 'hi' })

o1.loop = o1 // 循环引用对象

const o2 = deepClone(o1)
o2
// {
//   obj: { foo: 'hello' },
//   arr: [1, [2], {}],
//   func: function () { return 1 },
//   udf: undefined,
//   sym: Symbol('sym'),
//   nan: NaN,
//   inf: Infinity,
//   date: Date Thu Oct 07 2021 20:19:13 GMT+0800 (中国标准时间),
//   reg: /123/,
//   bar: 'world',
//   loop: [Circular]
// }
```

