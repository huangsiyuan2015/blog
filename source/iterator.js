const arr = [1, 2, 3, 4];
const it = arr[Symbol.iterator]();
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

Object.prototype.foo = function () {};
const obj = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  length: 4,
  bar: function () {},
  [Symbol.iterator]() {
    const arr = Object.values(
      JSON.parse(
        JSON.stringify(obj, (key, value) => (isNaN(+key) ? undefined : value))
      )
    );

    let len = arr.length;
    let index = 0;

    return {
      next: function () {
        if (index < len) {
          return {
            value: arr[index++],
            done: false,
          };
        } else {
          return {
            value: undefined,
            done: true,
          };
        }
      },
    };
  },
};

// for (let key in obj) {
//   console.log(key);
// }
// console.log(Object.keys(obj));
// console.log(JSON.stringify(obj));
// // JSON.stringify() 的第二个参数可以用来过滤对象的某些属性
// console.log(
//   JSON.stringify(obj, (key, value) => (isNaN(+key) ? undefined : value))
// );

// for-of 本质上是在自动调用迭代器接口
for (let elem of obj) {
  console.log(elem);
}

// 手动调用迭代器接口
let iter = obj[Symbol.iterator]();
let flag = true;
while (flag) {
  let result = iter.next();
  if (!result.done) {
    console.log(result.value);
  } else {
    flag = false;
  }
}

// ... 展开运算符的本质是使用 for-of 进行迭代
// for-of 本质上是在调用迭代器接口
// String、Array、Set、Map 都默认配置了迭代器接口
