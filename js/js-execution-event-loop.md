## 事件循环(Event loop)

node v10 以及之前的版本事件循环机制和浏览器的有所不同，但是 v11 之后的版本就和浏览器一样了。

### 浏览器

![event-loop-browser](js-execution-event-loop.assets/event-loop-browser.png)

### Node

<img src="js-execution-event-loop.assets/event-loop-node.png" alt="event-loop-node"  />

### setTimeout() vs setInterval()

重新理解 setTimeout(cb, ms)，setTimeout 并不是延迟多少毫秒执行，而是延迟多少毫秒把异步任务放入**事件队列**，事件队列中可能有正在排队的异步任务，主线程的调用栈中也可能正在执行同步任务，所以 setTimeout 执行的时间往往是大于设置的延迟时间的。

```js
// setTimeout 即使到期了也要等到 foo 执行完后才能执行
setTimeout(function bar() {
  console.log("bar");
}, 0);

function foo() {
  for (let i = 0; i < 5000; i++) {
    console.log(i);
  }
}

foo();
```

setInterval 也是同理，setInterval 并不能准确的实现每隔多少毫秒重复执行异步任务，而是每隔多少毫秒把异步任务放入事件队列，如果异步任务的执行时间等于设置的间隔时间，那么将会感受不到两次执行的时间间隔。（实际的间隔时间 = 设置的间隔时间 - 执行的时间）

如果异步任务的执行时间大于设置的间隔时间，将会导致事件队列中积压大量的异步任务，从而产生性能问题。解决这个问题的办法是，可以递归调用 setTimeout 来实现定时执行，递归调用 setTimeout 可以剔除异步任务的执行时间，减小两次执行的时间间隔的误差。

```js
setInterval(function foo() {
  console.log("foo");
}, 3000);

// setInterval 转换为 setTimeout 的写法
setTimeout(function foo() {
  console.log("foo");
  setTimeout(foo, 3000);
}, 3000);
```

setTimeout 和 setInterval 在执行时间上都有很大的误差，对于一些时间粒度要求更精细的操作可以使用 requestAnimationFrame。

### setTimeout() vs requestAnimationFrame()

- [requestAnimationFrame用法](https://juejin.cn/post/6844903649366245384)
- [放弃定时器，使用更高效的requestAnimationFrame来做动画](https://juejin.cn/post/6995198166039527432)

```html
<div class="box" style="background-color: #eee;">
  <div class="progress" style="height: 200px; background-color: orange;"></div>
</div>
```

```js
const progressDom = document.querySelector('.progress')
let progressStep = 0

// 使用 setTimeout 实现动画
function progress() {
  if (progressStep < 100) {
    progressStep++
    progressDom.style.width = `${progressStep}%`
  }
  window.setTimeout(progress, 100)
}
window.setTimeout(progress, 100)

// 使用 requestAnimationFrame 实现动画
// function progress() {
//   if (progressStep < 100) {
//     progressStep++
//     progressDom.style.width = `${progressStep}%`
//   }
//   window.requestAnimationFrame(progress)
// }
// window.requestAnimationFrame(progress)
```

### setTimeout() vs setImmediate()

setTimeout 是在 timers 阶段执行，setImmediate 是在 check 阶段执行。

Node 环境中 setTimeout 的到期检查也是不准的，受其它正在运行的应用程序的影响。

```js
// 结果不确定
setTimeout(() => {
  console.log("timeout");
}, 0);

setImmediate(() => {
  console.log("immediate");
});
```

```js
const fs = require("fs");

// 放在同一个 IO callback 中，结果就是确定的
// IO callback 的后面是 check 阶段，所以 setImmediate 一定比 setTimeout 先执行
fs.readFile("test.txt", () => {
  console.log("readFile");
  setTimeout(() => {
    console.log("timeout");
  }, 0);
  setImmediate(() => {
    console.log("immediate");
  });
});
```

### process.nextTick() vs setImmediate()

process.nextTick 是在各个事件阶段之间执行，一旦执行要直到 nextTick 队列被清空，才会进入到下一个事件阶段。

所以如果递归调用 process.nextTick，会导致出现 I/O starving（饥饿）的问题。

```js
const fs = require("fs");

const starttime = Date.now();
fs.readFile("text.txt", () => {
  let endtime = Date.now();
  console.log("finish reading time: ", endtime - starttime);
});

let index = 0;
function handler() {
  if (index++ >= 1000) return;

  console.log(`nextTick ${index}`);
  // process.nextTick 会一直执行完才会执行 fs.readFile 的回调
  process.nextTick(handler);
  
  // console.log(`setImmediate ${index}`)
  // setImmediate 在 check 阶段执行，fs.readFile 的回调在 IO callbacks 阶段执行 
  // setImmediate(handler)
}

handler();
```

另外，process.nextTick 队列的优先级是大于微任务队列的。

```js
process.nextTick(() => console.log(1));
Promise.resolve().then(() => console.log(2));
process.nextTick(() => console.log(3));
Promise.resolve().then(() => console.log(4));
// 1 3 2 4
```

> 面试题：说出下面代码的打印结果。

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});

console.log("script end");

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout
// 注意：async 函数中只有 await 是异步的，await 之前的代码都是同步的
```

```js
console.log("start");

setTimeout(() => {
  console.log("children2");
  Promise.resolve().then(() => {
    console.log("children3");
  });
}, 0);

new Promise(function (resolve, reject) {
  console.log("children4");
  setTimeout(function () {
    console.log("children5");
    resolve("children6");
  }, 0);
}).then((res) => {
  console.log("children7");
  setTimeout(() => {
    console.log(res);
  }, 0);
});

// start
// children4
// children2
// children3
// children5
// children7
// children6
// 注意：pending 状态的 promise 的 then 方法中的回调函数不放进微任务队列中
```

```js
const p = function () {
  return new Promise((resolve, reject) => {
    const p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(1);
      }, 0);
      resolve(2);
    });
    p1.then((res) => {
      console.log(res);
    });
    console.log(3);
    resolve(4);
  });
};

p().then((res) => {
  console.log(res);
});

console.log("end");

// 3
// end
// 2
// 4
// 注意：promise 的状态只会 resolve 一次，状态一旦凝固就不会再发生变化了
```

```js
console.log("1");

setTimeout(function () {
  console.log("2");

  process.nextTick(function () {
    console.log("3");
  });

  new Promise(function (resolve) {
    console.log("4");
    resolve();
  }).then(function () {
    console.log("5");
  });
});

process.nextTick(function () {
  console.log("6");
});

new Promise(function (resolve) {
  console.log("7");
  resolve();
}).then(function () {
  console.log("8");
});

setTimeout(function () {
  console.log("9");

  process.nextTick(function () {
    console.log("10");
  });

  new Promise(function (resolve) {
    console.log("11");
    resolve();
  }).then(function () {
    console.log("12");
  });
});

// 1
// 7
// 6
// 8
// 2
// 4
// 3
// 5
// 9
// 11
// 10
// 12
// 注意：setTimeout 和 setInterval 是宏任务，promise 和 process.nextTick 是微任务
```

### 参考链接

- [JavaScript中的Event Loop（事件循环）机制](https://segmentfault.com/a/1190000022805523)
- [这一次，彻底弄懂 JavaScript 执行机制](https://juejin.cn/post/6844903512845860872)
- [深入理解js事件循环机制（浏览器篇）](http://lynnelv.github.io/js-event-loop-browser)
- [深入理解js事件循环机制（Node.js篇）](http://lynnelv.github.io/js-event-loop-nodejs)
- 浏览器工作原理与实践 - 浏览器中的页面循环系统
  - [15 | 消息队列和事件循环：页面是怎么“活”起来的？](https://time.geekbang.org/column/article/132931)
  - [16 | WebAPI：setTimeout是如何实现的？](https://time.geekbang.org/column/article/134456)
  - [17 | WebAPI：XMLHttpRequest是怎么实现的？](https://time.geekbang.org/column/article/135127)
  - [18 | 宏任务和微任务：不是所有任务都是一个待遇](https://time.geekbang.org/column/article/135624)
