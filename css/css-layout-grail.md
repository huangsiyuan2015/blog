## 圣杯布局/双飞翼布局

圣杯布局/双飞翼布局的特点：

1. 经典的三栏布局，左右两栏定宽，中栏自适应
2. 中栏在 DOM 顺序中排第一优先加载(中左右)，但中栏在浏览器的视觉位置上排第二(左中右)
3. 三栏高度相互独立

概念出处：

- 圣杯布局：[In Search of the Holy Grail](https://alistapart.com/article/holygrail/)
- 双飞翼布局：[双飞翼布局介绍-始于淘宝UED](http://www.imooc.com/wenda/detail/254035)

代码实现：

- 圣杯布局：[grail-layout.html](css-layout-grail.assets/grail-layout.html)
- 双飞翼布局：[wing-layout.html](css-layout-grail.assets/wing-layout.html)
- flexbox 轻松实现圣杯布局：[flexbox-grail-layout.html](css-layout-grail.assets/flexbox-grail-layout.html)
