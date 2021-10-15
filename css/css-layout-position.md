## 定位

css 中的定位包括：

1. 静态定位：position: static
2. 相对定位：position: relative
3. 绝对定位：position: absolute
4. 固定定位：position: fixed
5. 粘性定位：position: sticky

各种定位方式的特点：

1. 静态定位是元素定位的默认值，没有什么特殊行为
2. 相对定位是元素相对自身在正常流中的位置进行定位，相对定位的元素会保留元素定位前的空间
3. 绝对定位是元素相对最近的已定位的父元素进行定位，如果没有就相对文档的根元素进行定位，绝对定位的元素会脱离文档的正常流
4. 固定定位是元素相对于浏览器视口进行定位，固定定位的元素也会脱离文档的正常流
5. 粘性定位像是相对定位和固定定位的组合，粘性定位的元素当滚动到某个阈值点时变成固定定位，但定位前的空间会被保留

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>position</title>
  <style>
    body {
      width: 500px;
      height: 1400px;
      margin: 0 auto;
      /* 作为绝对定位的相对元素 */
      /* position: relative; */
    }

    h1 {
      /* 固定定位 */
      /* position: fixed; */
      top: 0;
      width: 480px;
      padding: 10px;
      margin: 0;
      background: white;
    }

    p:nth-of-type(1) {
      /* 固定定位脱离正常流，后面的元素要撑开高度 */
      /* margin-top: 62px; */
    }

    p {
      background: aqua;
      border: 3px solid blue;
      padding: 10px;
      margin: 10px;
    }

    .positioned {
      /* 相对定位 */
      /* position: relative; */

      /* 绝对定位 */
      /* 如果有最近的已定位的父元素，就相对父元素 */
      /* 如果没有最近的已定位的父元素，就相对根元素 */
      /* position: absolute; */

      /* 粘性定位 */
      /* 元素距离视口顶端小于 30px 时变为固定定位，但定位前的空间会保留 */
      /* position: sticky; */
      left: 30px;
      top: 30px;
      background: yellow;
    }

    span {
      background: red;
      border: 1px solid black;
    }
  </style>
</head>

<body>
  <h1 class="fixed">positioning</h1>

  <p>I am a basic block level element. My adjacent block level elements sit on new lines below me.</p>

  <p class="positioned">By default we span 100% of the width of our parent element, and we are as tall as our child
    content. Our total
    width and height is our content + padding + border width/height.</p>

  <p>We are separated by our margins. Because of margin collapsing, we are separated by the width of one of our margins,
    not both.</p>

  <p>inline elements <span>like this one</span> and <span>this one</span> sit on the same line as one another, and
    adjacent text nodes, if there is space on the same line. Overflowing inline elements will <span>wrap onto a new line
      if possible (like this one containing text)</span>, or just go on to a new line if not, much like this image will
    do: <img src="https://mdn.mozillademos.org/files/13360/long.jpg"></p>
</body>

</html>
```

