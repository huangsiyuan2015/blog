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

## 对象克隆