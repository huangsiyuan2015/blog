## 水平垂直居中

div 元素水平垂直居中分为两种情况：

- 元素固定宽高
- 元素不定宽高

元素**固定宽高**：

1. 绝对定位 + calc(50% - selfWidth/2)
2. 绝对定位 + 负外边距(margin-left: -selfWidth/2)
3. 绝对定位 + margin: auto

元素**不定宽高**：

1. 绝对定位 + translate()
2. flex 布局(justify-content/align-items)
3. flex 布局(margin: auto)
4. grid 布局(margin: auto)
5. table-cell 布局 + margin: 0 auto
6. table-cell 布局 + display: inline-block + text-align: center

代码实现：[horizontal-vertical-center.html](css-layout-center.assets/horizontal-vertical-center.html)

参考链接：

- [（史上最全）div居中的几种方法](https://juejin.cn/post/6844903821529841671)
- [面试官：你能实现多少种水平垂直居中的布局（定宽高和不定宽高）](https://juejin.cn/post/6844903982960214029)
