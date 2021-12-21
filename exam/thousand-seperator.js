// 实现数值的千分位分隔
const number = 19351235.235767; // 19,351,235.235767

function thousandSeperator(num) {
  let numArr = String(num).split(".");
  let integerArr = numArr[0].split("");
  let fraction = numArr[1];

  let result = [];
  let count = 1;
  while (integerArr.length) {
    result.unshift(integerArr.pop());
    if (!(count % 3)) result.unshift(",");
    count++;
  }

  return fraction ? result.join("") + "." + fraction : result.join("");
}

console.log(thousandSeperator(number));
