## front-end-knowledge

前端知识体系

### js

- 数据类型
  - [数据类型和类型转换](js/js-type.md)
  - [浮点数精度问题（0.1 + 0.2 !== 0.3）](js/js-type-number.md)
  - [对象的浅拷贝和深拷贝](js/js-type-clone.md)
- 面向对象
  - [创建对象的方法和 new 运算符](js/js-oop-object.md)
  - [this 指向和 call/apply/bind 方法](js/js-oop-this.md)
  - [原型和原型链](js/js-oop-proto.md)
  - [原型链和继承（七种继承方式）](js/js-oop-inherit.md)
- 数组
  - [数组常用 api 总结](js/js-array-api.md)
  - [类数组对象转换和数组拷贝（四种方法）](js/js-array-like.md)
  - [数组去重（三种思路，九种方法）](js/js-array-unique.md)
  - [数组展开（八种方法）](js/js-array-flat.md)
  - [数组排序（十大经典排序算法）](js/js-array-sort.md)
- 函数
  - [作用域链和闭包](js/js-func-closure.md)
- 异步编程
  - [callback 和 Promise](js/js-async-promise.md)
  - [Generator 和 async/await](js/js-async-await.md)
  - [手写 EventEmitter（发布订阅模式）](js/js-async-event.md)
  - [手写 Promise 以及相关 api](js/js-async-promise-aplus.md)
- 执行机制
- 手写源码
  - [instanceof](source/instanceof.js)
  - [new](source/new.js)
  - [iterator](source/iterator.js)
  - [call](source/call.js)
  - [apply](source/apply.js)
  - [bind](source/bind.js)
  - [curry](source/curry.js)
  - [forEach](source/forEach.js)
  - [map](source/map.js)
  - [filter](source/filter.js)
  - [some](source/some.js)
  - [every](source/every.js)
  - [reduce](source/reduce.js)

### css

- 选择器
  - [选择器类型](css/css-selector-type.md)
  - [选择器的优先级和计算规则](css/css-selector-priority.md)
- 单位
- 布局
  - [盒模型](css/css-layout-box.md)
  - [浮动](css/css-layout-float.md)
  - [定位](css/css-layout-position.md)
  - [块级格式化上下文（BFC: Block Formatting Context）](css/css-layout-bfc.md)
  - [层叠上下文（Stacking Context）](css/css-layout-stacking-context.md)
  - [弹性盒子布局（Flexbox Layout）](css/css-layout-flexbox.md)
  - 网格布局（Grid Layout）
  - [元素水平垂直居中（两种情况，九种方法）](css/css-layout-center.md)
  - [圣杯布局/双飞翼布局](css/css-layout-grail.md)
- 样式

### html

- DOM
- BOM(Web API)
  - 前端路由实现（hash 和 history）

- browser

### http

### react ecosystem

- react
  - 高级特性
    - [Context](react/react-context/react-context.html)
    - [Ref 引用/Ref 转发](react/react-ref/react-ref.html)
    - [Portal](react/react-portal/react-portal.html)

- react-router
- redux/react-redux
- react-query

### 性能优化

- [防抖和节流](optimize/optimize-debounce-throttle.md)

### 数据结构

- [链表](data-structure/LinkedList.js)/[双向链表](data-structure/DoublyLinkedList.js)/[循环链表](data-structure/CircularLinkedList.js)
- [栈](data-structure/stack.md)
- [二叉树](data-structure/BinarySearchTree.js)
- [二叉堆](data-structure/Heap.js)

### 编程题

- [打印九九乘法表](exam/multiply.js)
- [实现字符串翻转](exam/string-reverse.js)
- [实现千分位分隔符](exam/thousand-seperator.js)
- [判断是否为回文数](exam/palindrome.js)
- [判断是否为素数/获取 n 以内的所有素数](exam/prime.js)
