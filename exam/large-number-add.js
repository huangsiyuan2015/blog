// 实现两个大数相加
// js 中的最大安全数是 2 ** 53 - 1，超出范围的数字会损失精度

// 思路：使用字符串模拟数值相加
// 实现：'9007199254740991' + '1234567899999999999'

// 参考链接：https://zhuanlan.zhihu.com/p/72179476

function largeNumberAdd(a, b) {
  // 找到最大长度
  let maxLen = Math.max(a.length, b.length)

  // 根据最大长度补 0
  a = a.padStart(maxLen, '0')
  b = b.padStart(maxLen, '0')

  // 字符串模拟数值相加
  let overflow = 0
  let digit = ''
  for (let i = maxLen - 1; i >= 0; i--) {
    let sum = +a[i] + +b[i] + overflow

    if (sum >= 10) {
      digit = sum - 10 + digit
      overflow = 1
    } else {
      digit = sum + digit
      overflow = 0
    }
  }

  return digit
}

largeNumberAdd('9007199254740991', '1234567899999999999')
