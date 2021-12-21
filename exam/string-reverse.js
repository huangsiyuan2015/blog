// 字符串翻转
const string = "hello";

// 解法一：使用数组的 reverse()
// function reverseString(str) {
//   // return str.split("").reverse().join("");
//   return [...str].reverse().join("");
// }

// 解法二：数组首尾交换
// function reverseString(str) {
//   const strArr = [...str];
//   let j = strArr.length - 1;
//   for (let i = 0; i < strArr.length >> 1; i++) {
//     let temp = strArr[i];
//     strArr[i] = strArr[j - i];
//     strArr[j - i] = temp;
//   }
//   return strArr.join("");
// }

// 解法三：双指针法
function reverseString(str) {
  const strArr = [...str];
  let i = 0;
  let j = strArr.length - 1;
  while (i < j) {
    let temp = strArr[i];
    strArr[i] = strArr[j];
    strArr[j] = temp;
    i++;
    j--;
  }
  return strArr.join("");
}

console.log(reverseString(string));
