## 浮动

通过 float 属性可以设置元素浮动，浮动元素会脱离文档的正常流(normal flow)：

1. 块级元素会认为浮动元素不存在
2. 行内元素会围绕浮动元素排列
3. 浮动元素会通过影响行内元素间接影响包含块的布局

### 高度塌陷

浮动元素会造成父容器高度塌陷，为了撑起父容器的高度需要清除浮动。

清除浮动的方法有：

1. 触发 BFC 清除浮动
2. 使用伪元素(::after)清除浮动
3. 包含块自己也浮动

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>float</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    .container {
      /* 方法一：触发 BFC 清除浮动 */
      /* overflow: hidden; */

      /* 方法三：包含块自己也浮动 */
      /* float: left; */
      border: solid 2px lightslategray;
    }

    /* 方法二：伪元素清除浮动 */
    /* .container::after {
      content: '';
      display: block;
      clear: both;
    } */

    .box {
      float: left;
      width: 200px;
      height: 200px;
      background: lightgreen;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="box"></div>
  </div>
</body>

</html>
```

