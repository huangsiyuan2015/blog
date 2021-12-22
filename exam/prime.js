// 判断是否为素数，素数除了 1 和它本身没有其它的约数
let random = (Math.random() * 100) | 0; // [0,100) 内的随机数

// 解法一：遍历 2 到 n-1 判断能否整除
// function isPrime(num) {
//   for (let i = 2; i <= num - 1; i++) {
//     if (num % i === 0) return false;
//   }
//   return true;
// }

// 解法一改进：不用遍历 2 到 n-1，只要遍历 2 到 sqrt(n)
// 一个数能被因式分解，一定是左边 < sqrt(n)，右边 > sqrt(n)，左边找不到的话右边就不存在
function isPrime(num) {
  let sqrt = Math.sqrt(num) | 0;
  for (let i = 2; i <= sqrt; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// console.log(random, isPrime(random));

// 获取 n 以内的所有素数

// 解法一：遍历 2 到 n，依次判断每个数是否为素数
// function countPrimes(n) {
//   let primes = [];
//   // 时间复杂度 O(n)
//   for (let i = 2; i <= n; i++) {
//     // 时间复杂度 O(√n)
//     if (isPrime(i)) primes.push(i);
//   }
//   // 所以总的时间复杂度为 O(n * √n) = O(√n)
//   return primes;
// }

// 解法二：埃氏筛
// 每个素数的倍数一定是合数，将 n 以内每个素数的倍数都过滤掉，剩下的就是素数
// function countPrimes(n) {
//   // 素数利用数组下标表示，每个数组元素为布尔值，表示数组下标是否为素数
//   // 注意，n 个元素的数组下标最大为 n - 1，所以数组长度为 n + 1 才能表示到 n
//   const isPrimes = Array.from({ length: n + 1 }).fill(true);

//   for (let i = 2; i <= n; i++) {
//     if (isPrimes[i]) {
//       // 素数的倍数从乘以自身开始
//       for (let j = i * i; j <= n; j += i) {
//         isPrimes[j] = false;
//       }
//     }
//   }

//   let primes = [];
//   for (let i = 2; i < isPrimes.length; i++) {
//     if (isPrimes[i]) primes.push(i);
//   }

//   return primes;
// }

// 解法三：线性筛（欧拉筛）


console.log(countPrimes(10000000));
