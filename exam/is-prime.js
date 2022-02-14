// 判断一个数是否为素数/质数
// 素数除了 1 和它本身没有其它的约数

// 参考链接：https://blog.csdn.net/huang_miao_xin/article/details/51331710

// 解法一：遍历 2 ~ n - 1 判断是否有约数
// function isPrime(num) {
//   for (let i = 2; i < num; i++) {
//     if (num % i === 0) return false
//   }
//   return true
// }

// 解法二：不必遍历到 n - 1，遍历到 sqrt(n) 即可
// 根据因式分解，如果有约数，约数一定是一个小于 sqrt(n) 一个大于 sqrt(n) 的
// 如果左边找不到的话，那么右边也不存在的
function isPrime(num) {
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false
  }
  return true
}

isPrime(3001) // true
