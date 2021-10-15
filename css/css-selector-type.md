## 选择器

css 中的选择器按类别可以分为：

1. 简单选择器(simple selectors)
2. 属性选择器(attribute selectors)
3. 分组选择器(grouping selectors)
4. 组合器(combinators)
5. 伪类(pseudo-classes)
6. 伪元素(pseudo-elements)

### 简单选择器

- 通用选择器：*
- 元素选择器：div、span
- id 选择器(#)：#id、#root
- 类选择器(.)：.container、.box

### 属性选择器

- 存在和值属性选择器
  - [attr]：选择包含 attr 属性的元素，不论值为何
  - [attr = val]：选择包含 attr 为 val 值的所有元素
  - [attr ~= val]：选择存在 attr 属性且值包含(以空格分隔多个值) val 的所有元素，比如 class 选择器
- 子串属性选择(伪正则选择器)
  - [attr |= val]：选择 attr 属性以 val 或 val- 开头的元素(-用来处理语言编码，比如 lang="en-us")
  - [attr ^= val]：选择 attr 属性以 val(包括 val) 开头的元素
  - [attr $= val]：选择 attr 属性以 val(包括 val) 结尾的元素
  - [attr *= val]：选择 attr 属性包含 val 字符串的元素

### 组合器

组合器表示多个选择器组合：

- 并集组合器(A, B)：选择所有 A 元素和 B 元素
- 后代组合器(A B)：选择 A 的所有后代元素 B
- 子元素选择器(A > B)：选择 A 的所有**子元素** B
- 相邻兄弟选择器(A + B)：选择 A 的**下一个兄弟元素** B
- 一般兄弟选择器(A ~ B)：选择 A 后面的**一个兄弟元素** B

### 伪类

伪类(:)表示处于某种状态下的元素：

- 状态伪类
  - :link：选择未访问的链接
  - :visited：选择已访问的链接
  - :hover：选择鼠标悬浮时的元素
  - :active：选择鼠标点击时的元素
  - :focus：选择获取焦点的元素
- 结构伪类
  - :not()：选择不匹配某组选择器的元素
  - :first-child：选择第一个子元素
  - :last-child：选择最后一个子元素
  - :nth-child()：根据规则选择一个或多个子元素(比如：div:nth-child(2n+1))
  - :nth-last-child()：和 :nth-child 类似，区别是从最后一个元素开始计数
  - :first-of-type：在一组兄弟元素中选择特定类型第一次出现的元素
  - :last-of-type：在一组兄弟元素中选择特定类型最后一次出现的元素
  - :nth-of-type()：在一组兄弟元素中根据规则选择一个或多个元素(比如：p:nth-of-type(2n))
  - :nth-last-of-type()：和 :nth-of-type 类型，区别是从最后一个元素开始计数
  - :only-child：选择父元素中唯一的子元素
  - :only-of-type：选择父元素中唯一特定类型的元素
  - :empty：选择没有子元素的元素
- 表单伪类
  - :checked：选择被选中的表单元素(radio/checkbox)
  - :default：选择默认状态的表单元素
  - :disabled：选择禁用的表单元素
  - :enabled：选择没有 disabled 的表单元素
  - :in-range：选择 value 值处于 (min, max) 范围内的表单元素
  - :out-of-range：选择 value 值不在范围内的表单元素
  - :valid：选择输入值合法的表单元素
  - :invalid：选择输入值不合法的表单元素
  - :read-only：选择只读的表单元素
  - :read-write：选择可写的表单元素

#### :first-child vs :first-of-type

```html
<style>
  /* 找到 .container 下的第一个子元素(不论子元素是什么类型)：1 */
  .container> :first-child {
    background: lightcoral;
  }

  /* 找到 .container 下的第一个为 p 元素的子元素：2 */
  .container>p:first-of-type {
    background: lightgoldenrodyellow;
  }
</style>
<div class="container">
  <div class="box">1</div>
  <p class="box">2</p>
  <p class="box">3</p>
  <div class="box">4</div>
</div>
```

完整代码 [first-child-vs-first-of-type.html](css-selector-type.assets/first-child-vs-first-of-type.html)

#### :nth-child() vs :nth-of-type()

```html
<style>
  /* 找到 .container 下的排奇数的子元素：1 3 5 */
  .container> :nth-child(2n+1) {
    background: lightpink;
  }

  /* 找到 .container 下的 p 元素排奇数的子元素：2 6(1 3) */
  .container>p:nth-of-type(2n+1) {
    background: lightgoldenrodyellow;
  }
</style>
<div class="container">
  <div class="box">1</div>
  <p class="box">2</p>
  <div class="box">3</div>
  <p class="box">4</p>
  <div class="box">5</div>
  <p class="box">6</p>
</div>
```

完整代码 [nth-child-vs-nth-of-type.html](css-selector-type.assets/nth-child-vs-nth-of-type.html)

### 伪元素

伪元素(::)表示处于某个位置但不在文档树中的元素：

- ::before：创建一个伪元素，作为被选中元素的第一个**子元素**，常配合 content 属性一起使用
- ::after：创建一个伪元素，作为被选中元素的最后一个**子元素**，常配合 content 属性一起使用
- ::first-letter：选择某个块级元素第一行的第一个字母
- ::first-line：选择某个块级元素的第一行
- ::selection：选择鼠标选中元素高亮的部分