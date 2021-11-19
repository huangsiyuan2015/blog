// 1x1
// 1x2 2x2
// 1x3 2x3 3x3
// 1x4 2x4 3x4 4x4

let str = "";
for (let i = 1; i <= 9; i++) {
  for (let j = 1; j <= i; j++) {
    str += `${j}x${i}=${i * j} `;

    if (j === i) {
      console.log(str);
      str = "";
    }
  }
}
