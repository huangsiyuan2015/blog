// 判断是否为回文数(number)，回文数是正序和倒序都是一样的数字，例如：121
let num1 = 1221;
let num2 = 12321;

// 解法一：将数值转为字符串，翻转字符串和原值进行比较
// function isPalindrome(num) {
//   return String(num).split("").reverse().join("") === String(num);
// }

// 解法二：将数值转为字符数组，只比较数组长度的一半
// function isPalindrome(num) {
//   const arr = String(num).split("");
//   for (let i = 0, j = arr.length >> 1; i < j; i++) {
//     if (arr[i] !== arr[arr.length - 1 - i]) return false;
//   }
//   return true;
// }

// 解法三：同上，双指针法
// function isPalindrome(num) {
//   const arr = String(num).split("");
//   let i = 0;
//   let j = arr.length - 1;
//   while (i < j) {
//     if (arr[i] !== arr[j]) return false;
//     i++;
//     j--;
//   }
//   return true;
// }

// 解法四：直接翻转数值，和原数值进行比较
// function isPalindrome(num) {
//   if (num < 0) return false;

//   let copy = num;
//   let reverse = 0;
//   while (copy) {
//     let digit = copy % 10;
//     reverse = reverse * 10 + digit; // 翻转后的数字每次都 x10
//     copy = (copy / 10) | 0; // 与 0 按位或相当于取整
//   }
//   return reverse === num;
// }

// 解法五：直接翻转数值的一半，比较前后两部分是否相等
function isPalindrome(num) {
  if (num < 0) return false; // 负数直接返回 false

  let copy = num;
  let reverse = 0;
  // 翻转一半的话，判断条件是要么相等要么大于
  // 例如：1221,12 等于 12，12321,123 大于 12
  while (reverse < copy) {
    let digit = copy % 10;
    reverse = reverse * 10 + digit;
    copy = (copy / 10) | 0;
  }

  // 偶数位的话直接相等，奇数位的话把最后一位去掉
  return reverse === copy || ((reverse / 10) | 0) === copy;
}

console.log(num1, isPalindrome(num1));
console.log(num2, isPalindrome(num2));
