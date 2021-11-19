## 块级格式化上下文

Formatting Context (格式化上下文) 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。

BFC 即 Block Formatting Context (块级格式化上下文)，**具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素**，并且 BFC 具有普通容器所没有的一些特性。

通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。

除了有 BFC，还有 IFC(Inline Formatting Context)，FFC(Flexible Formatting Context)，GFC(Grids Formatting Context)。

### 触发 BFC

A block formatting context is created by at least one of the following:

- The root element of the document (`<html>`).
- Floats (elements where [`float`](https://developer.mozilla.org/en-US/docs/Web/CSS/float) isn't `none`).
- Absolutely positioned elements (elements where [`position`](https://developer.mozilla.org/en-US/docs/Web/CSS/position) is `absolute` or `fixed`).
- Inline-blocks (elements with [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display)`: inline-block`).
- Table cells (elements with [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display)`: table-cell`, which is the default for HTML table cells).
- Table captions (elements with [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display)`: table-caption`, which is the default for HTML table captions).
- Anonymous table cells implicitly created by the elements with [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display)`: table`, `table-row`, `table-row-group`, `table-header-group`, `table-footer-group` (which is the default for HTML tables, table rows, table bodies, table headers, and table footers, respectively), or `inline-table`.
- Block elements where [`overflow`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow) has a value other than `visible` and `clip`.
- [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display)`: flow-root`.
- Elements with [`contain`](https://developer.mozilla.org/en-US/docs/Web/CSS/contain)`: layout`, `content`, or `paint`.
- Flex items (direct children of the element with [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display)`: flex` or `inline-flex`) if they are neither [flex](https://developer.mozilla.org/en-US/docs/Glossary/Flex_Container) nor [grid](https://developer.mozilla.org/en-US/docs/Glossary/Grid_Container) nor [table](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Table) containers themselves.
- Grid items (direct children of the element with [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display)`: grid` or `inline-grid`) if they are neither [flex](https://developer.mozilla.org/en-US/docs/Glossary/Flex_Container) nor [grid](https://developer.mozilla.org/en-US/docs/Glossary/Grid_Container) nor [table](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Table) containers themselves.
- Multicol containers (elements where [`column-count`](https://developer.mozilla.org/en-US/docs/Web/CSS/column-count) or [`column-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/column-width) isn't `auto`, including elements with `column-count: 1`).
- [`column-span`](https://developer.mozilla.org/en-US/docs/Web/CSS/column-span)`: all` should always create a new formatting context, even when the `column-span: all` element isn't contained by a multicol container ([Spec change](https://github.com/w3c/csswg-drafts/commit/a8634b96900279916bd6c505fda88dda71d8ec51), [Chrome bug](https://bugs.chromium.org/p/chromium/issues/detail?id=709362)).

推荐使用 display: flow-root 属性触发 BFC，因为相比使用 overflow/position 等属性，该属性没有副作用，且语义性较好。

### BFC 特性的应用场景

- contain internal floats.（清除内部浮动）
- exclude external floats.（排除外部浮动影响）
- suppress [margin collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing).（解决外边距合并问题）

代码实现：[bfc.html](css-layout-bfc.assets/bfc.html)

### 参考链接

MDN BFC 文档：https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context

10 分钟理解 BFC 原理：https://zhuanlan.zhihu.com/p/25321647