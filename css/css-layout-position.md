## 定位

css 中的定位包括：

1. 静态定位：position: static
2. 相对定位：position: relative
3. 绝对定位：position: absolute
4. 固定定位：position: fixed
5. 粘性定位：position: sticky

### 静态定位

静态定位是元素定位的默认值。

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>position</title>
  <style>
    body {
      width: 500px;
      margin: 0 auto;
    }

    p {
      background: aqua;
      border: 3px solid blue;
      padding: 10px;
      margin: 10px;
    }

    .positioned {
      position: static;
      background: yellow;
    }

    span {
      background: red;
      border: 1px solid black;
    }
  </style>
</head>

<body>
  <h1>Basic document flow</h1>

  <p>I am a basic block level element. My adjacent block level elements sit on new lines below me.</p>

  <p class="positioned">By default we span 100% of the width of our parent element, and we are as tall as our child content. Our total
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

### 相对定位

相对定位是元素相对自身在正常流中的位置进行定位，相对定位的元素定位前的空间会被正常流保留。

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>position</title>
  <style>
    body {
      width: 500px;
      margin: 0 auto;
    }

    p {
      background: aqua;
      border: 3px solid blue;
      padding: 10px;
      margin: 10px;
    }

    .positioned {
      position: relative;
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
  <h1>Relative positioning</h1>

  <p>I am a basic block level element. My adjacent block level elements sit on new lines below me.</p>

  <p class="positioned">By default we span 100% of the width of our parent element, and we are as tall as our child content. Our total
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

### 绝对定位

绝对定位是元素相对最近的已定位的父元素进行定位，如果没有就相对文档的根元素进行定位，绝对定位的元素会脱离文档的正常流。

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>position</title>
  <style>
    body {
      width: 500px;
      margin: 0 auto;
    }

    p {
      background: aqua;
      border: 3px solid blue;
      padding: 10px;
      margin: 10px;
    }

    .positioned {
      /* 没有最近的已定位的父元素，相对根元素进行定位 */
      position: absolute;
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
  <h1>Absolute positioning</h1>

  <p>I am a basic block level element. My adjacent block level elements sit on new lines below me.</p>

  <p class="positioned">By default we span 100% of the width of our parent element, and we are as tall as our child content. Our total
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

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>position</title>
  <style>
    body {
      width: 500px;
      margin: 0 auto;
      position: relative;
    }

    p {
      background: aqua;
      border: 3px solid blue;
      padding: 10px;
      margin: 10px;
    }

    .positioned {
      /* 相对最近的已定位的父元素 body 进行定位 */
      position: absolute;
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
  <h1>Positioning context</h1>

  <p>I am a basic block level element. My adjacent block level elements sit on new lines below me.</p>

  <p class="positioned">By default we span 100% of the width of our parent element, and we are as tall as our child content. Our total
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

#### z-index

当元素开始堆叠时，通过设置 z-index 可以调整元素的堆叠顺序。

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>position</title>
  <style>
    body {
      width: 500px;
      margin: 0 auto;
      position: relative;
    }

    p {
      background: aqua;
      border: 3px solid blue;
      padding: 10px;
      margin: 10px;
    }

    .positioned {
      position: absolute;
      left: 30px;
      top: 30px;
      background: yellow;
    }

    p:nth-of-type(1) {
      position: absolute;
      top: 10px;
      right: 30px;
      z-index: 1;
      background: lime;
    }

    span {
      background: red;
      border: 1px solid black;
    }
  </style>
</head>

<body>
  <h1>z-index</h1>

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

### 固定定位

固定定位是元素相对于浏览器视口进行定位，固定定位的元素也会脱离文档的正常流。

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
    }

    h1 {
      position: fixed;
      top: 0;
      width: 480px;
      padding: 10px;
      margin: 0 auto;
      background: white;
    }

    p:nth-of-type(1) {
      margin-top: 62px;
    }

    p {
      background: aqua;
      border: 3px solid blue;
      padding: 10px;
      margin: 10px;
    }

    span {
      background: red;
      border: 1px solid black;
    }
  </style>
</head>

<body>
  <h1>Fixed positioning</h1>

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

### 粘性定位

粘性定位类型相对定位和固定定位的组合，粘性定位的元素先表现的像相对定位一样，直到滚动到某个阈值点就变成固定定位。

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
    }

    .positioned {
      position: sticky;
      top: 30px;
    }

    p {
      background: aqua;
      border: 3px solid blue;
      padding: 10px;
      margin: 10px;
    }

    span {
      background: red;
      border: 1px solid black;
    }
  </style>
</head>

<body>
  <h1>Basic document flow</h1>

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

