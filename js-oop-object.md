## 对象创建

js 中创建对象的方式有：

1. 以对象字面量的形式（工厂模式）
2. 通过 `new` 构造函数的形式
3. `Object.setPrototypeOf(obj, proto)` 方法
4. `Obejct.create(proto, [descriptor])` 方法

```js
// 对象字面量
function Person() {
  return {name: 'ace'}
}

// new 运算符
function Person() {this.name = 'ace'}
new Person()

// 原型为空的对象
Object.setPrototypeOf({name: 'ace'}, null)

// 原型为空的对象
Object.create(null, {name: {value: 'ace'}})
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

1. `Object.assign()` 方法
2. 展开运算符 `...`

#### Object.assign()

```js
const o1 = {
  foo: 1,
  bar: {
    baz: 2
  }
}

const o2 = Object.assign({}, o1)

o1.foo = 10
o1.bar.baz = 20

o2.foo = 1
o2.bar.baz = 20
```

#### 展开运算符 ...

```js
const o1 = {
  foo: 1,
  bar: {
    baz: 2
  }
}

const o2 = { ...o1 }

o1.foo = 10
o1.bar.baz = 20

o2.foo = 1
o2.bar.baz = 20
```

### 深拷贝

对象的深拷贝是将对象原始类型和引用类型的属性都复制到一个新的对象中，相当于产生了一个新的对象。

实现深拷贝的方法通常有：

1. `JSON.parse(JSON.stringify(obj))`
2. 利用递归实现
3. [lodash 的深拷贝函数](https://lodash.com/docs#cloneDeep)

#### JSON.parse(JSON.stringify(obj))

```js
const o1 = {
  foo: 1,
  bar: {
    baz: 2
  }
}

const o2 = JSON.parse(JSON.stringify(o1))

o1.foo = 10
o1.bar.baz = 20

o2.foo = 1
o2.bar.baz = 2
```

该方法有一些缺陷：

1. 会忽略 `undefined` 值
2. 会忽略 `symbol` 值
3. 会忽略函数
4. 不能解决循环引用的对象

```js
const o1 = {
  foo: undefined,
  bar: Symbol('sym'),
  baz: function () {}
}

const o2 = JSON.parse(JSON.stringify(o1))
o2 // {}
```

```js
const o1 = {
  foo: 1
}
o1.bar = o1 // 对象属性引用对象自身

const o2 = JSON.parse(JSON.stringify(o1))
// Uncaught TypeError: Converting circular structure to JSON
```

#### 递归实现

因为深拷贝需要考虑很多的边界情况，所以很难实现一个完整的深拷贝，这里只实现一个简易版的深拷贝。

```js
function deepClone(obj) {

  let isObj = function (obj) {
    return typeof obj === 'object' && obj !== null
  }

  if (isObj(obj)) {

    let clone = {}

    Object.keys(obj).forEach(key => {
      if (isObj(obj[key])) {
        clone[key] = deepClone(obj[key])
      } else {
        clone[key] = obj[key]
      }
    })

    return clone
  }
  else {
    return 'argument is not a object'
  }
}
```

> 面试题：什么是浅/深拷贝？如何实现浅/深拷贝？

略...
