## 数组排序

#### 冒泡排序(BubbleSort)

算法思想：每次遍历数组相邻元素两两比较，较大的元素放在右边，这样每遍历一次后末尾一定是最大值；剩下的元素又作为一个新数组，重复上一个过程。这样每次最大值都依次放在了末尾，形成了有序数组。

```js
let array = [7, 6, 8, 9, 3, 2, 4, 5, 1]

function bubbleSort(array) {

  // 外循环控制遍历次数，5个元素只需要遍历4次
  for (let j = array.length - 1; j > 0; j--) {
    // 内循环控制比较次数，每遍历一次后最右边总是最大值，可以少比较一次
    for (let i = 0; i < j; i++) {
      if (array[i] > array[i + 1]) {
        let temp = array[i]
        array[i] = array[i + 1]
        array[i + 1] = temp
      }
    }
  }
}

bubbleSort(array)
array // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

### *快速排序(QuickSort)

```js
let array = [7, 6, 8, 9, 3, 2, 4, 5, 1]

// 双向指针，填坑法
function quickSort(array, left, right) {

  // 递归出口
  if (left >= right) return

  // 每次选择左边第一个元素作为轴
  let pivot = array[left]
  // 双向指针，左指针和右指针
  let i = left
  let j = right

  while (i < j) {
    // 从右边开始遍历，找到一个小于轴的数
    while (i < j && array[j] > pivot) {
      j--
    }
    // 将右边小于轴的数放在左边
    if (i < j) {
      array[i++] = array[j]
    }
    // 从左边开始遍历，找到一个大于轴的数
    while (i < j && array[i] < pivot) {
      i++
    }
    // 将左边大于轴的数放到右边
    if (i < j) {
      array[j--] = array[i]
    }
  }
  array[i] = pivot // i 的位置就是轴的位置

  // 使用递归对左右子序列进行排序
  quickSort(array, left, i - 1)
  quickSort(array, i + 1, right)
}

quickSort(array, 0, array.length - 1)
array // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

```js
let array = [7, 6, 8, 9, 3, 2, 4, 5, 1]

// 单向指针（快慢指针）
function quickSort(array, left, right) {

  // 递归出口
  if (left >= right) return

  // 每次选择左边第一个元素作为轴
  let pivot = array[left]
  // 单向指针，快指针和慢指针
  let i, j
  i = j = left + 1

  while (j <= right) {
    // j 是快指针，i 是慢指针
    // 找到一个小于轴的数，快慢指针指向的值进行交换
    if (array[j] < pivot) {
      let temp = array[i]
      array[i] = array[j]
      array[j] = temp
      i++
    }
    j++
  }

  // i - 1 是轴应该在的位置，和轴进行交换
  let temp = array[left]
  array[left] = array[i - 1]
  array[i - 1] = temp

  // 使用递归对左右子序列进行排序
  quickSort(array, left, i - 2)
  quickSort(array, i, right)
}

quickSort(array, 0, array.length - 1)
array // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

### *归并排序(MergeSort)

```js
let array = [7, 6, 8, 9, 3, 2, 4, 5, 1]

function mergeSort(array, left, right) {

  // 递归出口
  if (left >= right) return

  // 每次将数组切割为两部分，直到只剩一个元素
  let mid = (left + right) >> 1
  mergeSort(array, left, mid)
  mergeSort(array, mid + 1, right)
  // 合并左右两个子序列
  merge(array, left, mid, right)

  function merge(array, left, mid, right) {

    let i = left // 左指针
    let j = mid + 1 // 右指针

    // 创建一个临时数组，用来存放合并后的有序序列
    let length = right - left + 1
    let result = Array.from({ length })
    let index = 0 // 临时数组的指针

    // 左指针小于左边界并且右指针小于右边界，比较左右序列的元素
    while (i <= mid && j <= right) {
      result[index++] = array[i] < array[j] ? array[i++] : array[j++]
    }

    // 左序列还有元素，遍历插入到临时数组
    while (i <= mid) {
      result[index++] = array[i++]
    }

    // 右序列还有元素，遍历插入到临时数组
    while (j <= right) {
      result[index++] = array[j++]
    }

    // 将临时数组覆盖到原数组
    for (let i = 0; i < result.length; i++) {
      array[left + i] = result[i]
    }
  }
}

mergeSort(array, 0, array.length - 1)
array // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```


#### 选择排序(SelectionSort)

算法思想：每次遍历数组找出最小值的下标，然后将最小值放在首位；剩下的元素又作为一个新数组，重复上一个过程。这样每次最小值都依次放在了首位，形成了有序数组。

```js
let array = [7, 6, 8, 9, 3, 2, 4, 5, 1]

// 每次找最小值放在最左边
function selectionSort(array) {

  // 外循环控制遍历次数，9个元素只需要遍历8次
  for (let j = 0; j < array.length - 1; j++) {
    let minIndex = j
    // 内循环控制比较找到最小值，标记最小值的下标
    for (let i = j + 1; i < array.length; i++) {
      if (array[i] < array[minIndex]) {
        minIndex = i
      }
    }
    // 将最小值和最左边的值进行交换
    let temp = array[j]
    array[j] = array[minIndex]
    array[minIndex] = temp
  }
}

selectionSort(array)
array // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

```js
let array = [7, 6, 8, 9, 3, 2, 4, 5, 1]

// 每次找最大值放在最右边
function selectionSort(array) {

  // 外循环控制遍历次数，9个元素只需要遍历8次
  for (let j = array.length - 1; j > 0; j--) {
    let maxIndex = j
    // 内循环控制比较找到最大值，标记最大值的下标
    for (let i = 0; i <= j; i++) {
      if (array[i] > array[maxIndex]) {
        maxIndex = i
      }
    }
    // 将最大值和最右边的值进行交换
    let temp = array[j]
    array[j] = array[maxIndex]
    array[maxIndex] = temp
  }
}

selectionSort(array)
array // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

#### 堆排序(HeapSort)

#### 插入排序(InsertionSort)

插入排序的原理：将数组分为有序和无序的前后两段，每次取无序区间的第一个元素，与有序区间的末尾元素倒着比较，如果小于就插入到前面，大于的话就停止比较。这样就形成了有序数组。

```js
let arr = [9, 3, 6, 5, 1]

function insertionSort(arr) {
  // 外循环控制待排序的第一个元素
  for (let i = 1; i < arr.length; i++) {
    // 内循环控制元素的插入，后面元素小于前面元素，就插入到前面
    for (let j = i - 1; j >= 0; j--) {
      if (arr[j + 1] < arr[j]) {
        let temp = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = temp
      } else {
        break
      }
    }
  }
  return arr
}

insertionSort(arr) // [ 1, 3, 5, 6, 9 ]
```

#### 希尔排序(ShellSort)

希尔排序的原理：希尔排序是对插入排序的优化，使用插入排序将较小的元素从数列末尾移动到首位，需要较多次的比较和交换，因为每次只交换1位；希尔排序通过设置间隔，增大元素每次交换的距离，使得数组变的基本有序，从而减少元素交换的次数，达到优化的目的。

```js
let arr = [7, 6, 8, 9, 3, 2, 4, 5, 1]

function shellSort(arr) {
  // js中没有整除，使用右移1位模拟2的整除，间隔每次减半
  for (let gap = arr.length >> 1; gap > 0; gap >>= 1) {
    // 插入排序
    for (let i = gap; i < arr.length; i++) {
      for (let j = i - gap; j >= 0; j -= gap) {
        if (arr[j + gap] < arr[j]) {
          let temp = arr[j]
          arr[j] = arr[j + gap]
          arr[j + gap] = temp
        } else {
          break
        }
      }
    }
  }
  return arr
}

shellSort(arr) // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

![image-20210825112532986](C:/Users/Ace/Desktop/image-20210825112532986.png)

### 计数排序(CountingSort)

```js
let arr = [3, 11, 5, 3, 7, 11, 11, 10, 7, 9]

function countingSort(arr) {

  let min, max
  min = max = arr[0]

  // 找到数组中的最大值和最小值
  arr.forEach((num) => {
    if (num < min) {
      min = num
    } else if (num > max) {
      max = num
    }
  })

  // 设置一个计数数组，根据最大值最小值确认数组长度，默认填充为 0
  let length = max - min + 1
  let count = Array.from({ length }).fill(0)

  // 统计原数组中每个元素出现的次数
  arr.forEach((num) => {
    count[num - min]++
  })

  // 将计数数组的下标根据统计的次数覆盖到原数组中
  let i = 0
  count.forEach((num, index) => {
    while (num--) {
      arr[i++] = index + min
    }
  })

  return arr
}

countingSort(arr) // [ 3, 3, 5, 7, 7, 9, 10, 11, 11, 11 ]
```

```js
let arr = [3, 11, 5, 3, 7, 11, 11, 10, 7, 9]

// 改善的计数排序，保证排序的稳定性
function countingSort(arr) {

  let min, max
  min = max = arr[0]

  // 找到数组中的最大值和最小值
  arr.forEach((num) => {
    if (num < min) {
      min = num
    } else if (num > max) {
      max = num
    }
  })

  // 设置一个计数数组，根据最大值最小值确认数组长度，默认填充为 0
  let length = max - min + 1
  let count = Array.from({ length }).fill(0)

  // 统计原数组中每个元素出现的次数
  arr.forEach((num) => {
    count[num - min]++
  })

  // 将计数数组改造为累加数组，用于计算下标
  for (let i = 1; i < count.length; i++) {
    count[i] = count[i - 1] + count[i]
  }

  // 倒序遍历原数组，将原数组中的元素插入到对应下标
  // 保证相同元素的相对位置保持不变，确保排序算法的稳定性
  let result = Array.from({ length: arr.length })
  for (let i = arr.length - 1; i >= 0; i--) {
    let j = arr[i] - min
    result[--count[j]] = arr[i]
  }

  return result
}

countingSort(arr) // [ 3, 3, 5, 7, 7, 9, 10, 11, 11, 11 ]
```

### 基数排序(RadixSort)

```js
let arr = [126, 69, 593, 23, 6, 89, 54, 8]

function radixSort(arr) {

  // 找到最大值，确定元素的最高位数
  let max = arr[0]
  arr.forEach((num) => {
    if (num > max) max = num
  })

  // 根据最大值的位数确定计数排序的次数
  let digit = String(max).length
  for (let radix = 0; radix < digit; radix++) {
    arr = countingSort(arr, radix)
  }

  function countingSort(arr, radix) {

    // 每个进制位的取值范围是 0-9，所以计数数组长度为 10
    let count = Array.from({ length: 10 }).fill(0)

    // 统计当前进制位上的数字出现的次数
    arr.forEach((num) => {
      count[(num / (10 ** radix) >> 0) % 10]++
    })

    // 对计数数组进行累加
    for (let i = 1; i < count.length; i++) {
      count[i] = count[i - 1] + count[i]
    }

    // 倒序遍历原数组，将元素插入到新数组的对应位置
    let result = Array.from({ length: arr.length })
    for (let i = arr.length - 1; i >= 0; i--) {
      let j = (arr[i] / (10 ** radix) >> 0) % 10
      result[--count[j]] = arr[i]
    }

    return result
  }

  return arr
}

radixSort(arr) // [ 6, 8, 23, 54, 69, 89, 126, 593 ]
```

```js
let array = [126, 69, 593, 23, 6, 89, 54, 8]

function radixSort(array) {

  // 找到最大值，确定元素的最高位数
  let max = array[0]
  array.forEach((num) => {
    if (num > max) max = num
  })

  // 根据最大值的位数，确定计数排序的次数
  let digit = String(max).length
  for (let i = 0; i < digit; i++) {

    // 创建一个二维数组，横坐标表示基数 0-9，纵坐标存放对应基数的元素
    let count = Array.from({ length: 10 }).map(() => [])
    let result = []

    array.forEach((num) => {
      count[(num / (10 ** i) >> 0) % 10].push(num)
    })
    // console.log(count)

    count.forEach((innerArr) => {
      if (!innerArr.length)
        return
      else
        innerArr.forEach((num) => {
          result.push(num)
        })
    })
    // console.log(result)
    array = result
  }

  return array
}

radixSort(array) // [ 6, 8, 23, 54, 69, 89, 126, 593 ]
```

### 桶排序(BucketSort)
