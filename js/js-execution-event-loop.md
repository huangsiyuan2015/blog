## 事件循环机制

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
```

注意：async 函数中只有 await 是异步的，await 之前的代码都是同步的

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
```

注意：pending 状态的 promise 的 then 方法中的回调函数不放进微任务队列中

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
```

注意：promise 的状态只会 resolved 一次，状态一旦凝固就不会再发生变化了

### 参考链接

- [JavaScript中的Event Loop（事件循环）机制](https://segmentfault.com/a/1190000022805523)
