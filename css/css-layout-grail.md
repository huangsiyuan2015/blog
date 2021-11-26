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
- grid 轻松实现圣杯布局：[grid-grail-layout.html](css-layout-grail.assets/grid-grail-layout.html)

弹性盒子布局 和 网格布局 的区别：

1. 一维布局 vs 二维布局
   - flexbox 是一维布局，要么是行要么是列，只能在一个方向上排列元素
   - grid 布局是二维布局，可以同时调整元素所占的行和列
2. 内容出发 vs 布局出发
   - flexbox 从内容出发：元素个数不确定的情况下进行布局，后续如果元素增加也无需调整布局，由内容自己的大小决定占据的空间
   - grid 从布局出发：先规划好网格区域，然后再向网格中填充元素，一般情况下元素个数是固定的
