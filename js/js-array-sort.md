## 数组排序

常用的排序算法一般分为：

1. 比较类排序算法
2. 非比较类排序算法

比较类排序算法：通过比较来决定元素间的相对次序，其时间复杂度不能突破 O(nlogn)，因此也称为非线性时间比较类排序

非比较类排序算法：不通过比较来决定元素间的相对次序，它可以突破基于比较排序的时间下限，以线性时间运行，因此也称为线性时间非比较类排序

### 比较类排序

#### 交换排序

##### 冒泡排序(BubbleSort)

算法思路：

1. 每次遍历数组相邻元素两两比较，较大的元素放在右边，这样每遍历一次最大值就交换到了末尾
2. 剩下的元素又作为一个新数组，重复上述过程。这样每次最大值都依次放在了末尾，形成了有序数组

稳定性：稳定

时间复杂度：O(n²)

空间复杂度：O(1)

```js
let array = [7, 6, 8, 9, 3, 2, 4, 5, 1]

function bubbleSort(array) {

  // 外循环控制遍历次数，n 个元素只需要排序 n-1 次
  for (let j = array.length - 1; j > 0; j--) {
    // 内循环控制元素两两比较，每遍历完一次最大值就交换到最右边
    for (let i = 0; i < j; i++) {
      if (array[i] > array[i + 1]) {
        let temp = array[i]
        array[i] = array[i + 1]
        array[i + 1] = temp
      }
    }
    // console.log(array) // 打印每轮排序后的结果
  }

  return array
}

bubbleSort(array) // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

##### *快速排序(QuickSort)

算法思路：

1. 选择一个元素作为基准值(pivot)，比 pivot 大的值放右边，比 pivot 小的值放左边，这样就形成了以 pivot 为中心的有序序列
2. 以 pivot 为中心，将序列划分为左右两个子序列，递归调用排序子序列

稳定性：不稳定

时间复杂度：O(nlogn)

空间复杂度：O(logn)

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
  // console.log(array) // 打印每轮排序后的结果

  // 使用递归对左右子序列进行排序
  quickSort(array, left, i - 1)
  quickSort(array, i + 1, right)
  
  return array
}

quickSort(array, 0, array.length - 1) // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
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
  // console.log(array) // 打印每轮排序后的结果

  // 使用递归对左右子序列进行排序
  quickSort(array, left, i - 2)
  quickSort(array, i, right)
  
  return array
}

quickSort(array, 0, array.length - 1) // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

#### *归并排序(MergeSort)

算法思路：

1. 将序列分为两个有序的子序列，对两个子序列按照大小顺序进行合并，这样就形成了一个完整的有序序列
2. 只有一个元素的序列默认是有序的，使用递归将一个有序序列分割到只有一个元素，再进行合并

稳定性：稳定

时间复杂度：O(nlogn)

空间复杂度：O(n)

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

  return array

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
    // console.log(array) // 打印每轮排序后的结果
  }
}

mergeSort(array, 0, array.length - 1) // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

#### 选择排序

##### 选择排序(SelectionSort)

算法思路：

1. 每次遍历数组找出最小值的下标，然后将最小值放在首位
2. 剩下的元素又作为一个新数组，重复上一个过程。这样每次最小值都依次放在了首位，形成了有序数组

稳定性：不稳定

时间复杂度：O(n²)

空间复杂度：O(1)

```js
let array = [7, 6, 8, 9, 3, 2, 4, 5, 1]

// 写法一：最小值放在首位
function selectionSort(array) {

  // 外循环控制遍历次数，n 个元素只需要排序 n-1 次
  for (let j = 0; j < array.length - 1; j++) {
    let minIndex = j
    // 内循环控制每次遍历找到最小值的下标
    for (let i = j; i < array.length; i++) {
      if (array[i] < array[minIndex]) {
        minIndex = i
      }
    }
    // 将最小值与首位未排序的元素交换
    let temp = array[j]
    array[j] = array[minIndex]
    array[minIndex] = temp
    // console.log(array) // 打印每轮排序后的结果
  }

  return array
}

selectionSort(array) // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

```js
let array = [7, 6, 8, 9, 3, 2, 4, 5, 1]

// 写法二：最大值放在末尾
function selectionSort(array) {

  // 外循环控制遍历次数，n 个元素只需要排序 n-1 次
  for (let j = array.length - 1; j > 0; j--) {
    let maxIndex = j
    // 内循环控制每次遍历找到最小值的下标
    for (let i = 0; i <= j; i++) {
      if (array[i] > array[maxIndex]) {
        maxIndex = i
      }
    }
    // 将最大值与末尾未排序的元素交换
    let temp = array[j]
    array[j] = array[maxIndex]
    array[maxIndex] = temp
    // console.log(array) // 打印每轮排序后的结果
  }

  return array
}

selectionSort(array) // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

##### 堆排序(HeapSort)

算法思路：

1. 先将有序序列堆化成大顶堆，然后将堆顶的最大值放在末尾
2. 剩余元素再进行堆化，将堆顶的最大值放在次末尾，重复这个过程直到形成有序序列

时间复杂度：O(nlogn)

空间复杂度：O(1)

```js
let array = [7, 6, 8, 9, 3, 2, 4, 5, 1]

function heapSort(array) {

  // 将数组建立成一个大顶堆，堆顶是最大值
  let heap = buildMaxHeap(array)
  let bound = heap.length - 1

  // 把堆顶即最大值放在末尾，剩余元素重新堆化成大顶堆
  while (bound > 0) {
    swap(heap, 0, bound--)
    // console.log(array) // 打印每轮排序后的结果
    heapify(array, 0, bound)
  }

  return array

  function buildMaxHeap(array) {

    // 建堆时首先要找到第一个非叶子节点
    // 第一个非叶子节点是最后一个叶子节点的父节点(i - 1) / 2
    let lastIndex = array.length - 1
    for (let i = (lastIndex - 1) >> 1; i >= 0; i--) {
      heapify(array, i, lastIndex)
    }

    return array
  }

  function heapify(array, index, bound) {

    let maxIndex = index // 父节点
    let left = 2 * index + 1 // 左孩子
    let right = 2 * index + 2 // 右孩子

    if (left > bound || right > bound)
      return

    if (array[maxIndex] < array[left])
      maxIndex = left

    if (array[maxIndex] < array[right])
      maxIndex = right

    if (maxIndex !== index) {
      swap(array, index, maxIndex)
      heapify(array, maxIndex, bound)
    }
  }

  function swap(array, x, y) {
    let temp = array[x]
    array[x] = array[y]
    array[y] = temp
  }
}

heapSort(array) // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

#### 插入排序

##### *插入排序(InsertionSort)

算法思路（打扑克抓牌）：

1. 将数组分为有序和无序的前后两段，第 0 位默认是有序的，第 0 位后面的是无序的
2. 每次取无序区间的第一个元素，与有序区间的末尾元素倒着比较，如果小于就插入到前面，大于的话就停止比较

稳定性：稳定

时间复杂度：O(n²)

空间复杂度：O(1)

```js
let array = [7, 6, 8, 9, 3, 2, 4, 5, 1]

function insertionSort(array) {

  // 外循环控制待排序的第一个元素
  for (let i = 1; i < array.length; i++) {
    // 内循环控制元素的插入，后面元素小于前面，就插入到前面
    for (let j = i; j > 0; j--) {
      if (array[j] < array[j - 1]) {
        let temp = array[j]
        array[j] = array[j - 1]
        array[j - 1] = temp
      } else {
        break
      }
    }
    // console.log(array) // 打印每轮排序后的结果
  }

  return array
}

insertionSort(array) // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

##### 希尔排序(ShellSort)

算法思路：

1. 希尔排序是对插入排序的改进，插入排序将较小的元素从序列末尾移动到首位，因为每次只交换1位，所以需要较多次的比较和交换
2. 在插入排序的基础上，通过设置间隔，增大元素每次交换的距离，使得数组变的基本有序，从而减少元素交换的次数，达到优化的目的

稳定性：不稳定

时间复杂度：取决于步长

空间复杂度：O(1)

```js
let array = [7, 6, 8, 9, 3, 2, 4, 5, 1]

function shellSort(array) {

  // js中没有整除，使用右移1位模拟2的整除，间隔每次减半
  for (let gap = array.length >> 1; gap > 0; gap >>= 1) {
    // 改变间隔的插入排序，之前的间隔为 1，现在设为 gap
    for (let i = gap; i < array.length; i++) {
      for (let j = i; j > 0; j -= gap) {
        if (array[j] < array[j - gap]) {
          let temp = array[j]
          array[j] = array[j - gap]
          array[j - gap] = temp
        } else {
          break
        }
      }
      // console.log(array) // 打印每轮排序后的结果
    }
  }

  return array
}

insertionSort(array) // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

### 非比较类排序

#### 计数排序(CountingSort)

算法思路：

1. 用数组下标表示源数组中的元素，统计源数组中元素的出现次数
2. 根据计数数组的下标和统计的次数，按顺序将元素覆盖到源数组中

适用于：数据规模大，但是数据范围小的数据样本，比如：高考分数

稳定性：稳定

时间复杂度：O(n + k)

空间复杂度：O(k)

```js
let array = [3, 11, 5, 3, 7, 11, 11, 10, 7, 9]

function countingSort(array) {

  let min, max
  min = max = array[0]

  // 找到数组中的最大值和最小值
  array.forEach((num) => {
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
  array.forEach((num) => {
    count[num - min]++
  })

  // 将计数数组的下标根据统计的次数覆盖到原数组中
  let i = 0
  count.forEach((num, index) => {
    while (num--) {
      array[i++] = index + min
    }
  })

  return array
}

countingSort(array) // [ 3, 3, 5, 7, 7, 9, 10, 11, 11, 11 ]
```

```js
let array = [3, 11, 5, 3, 7, 11, 11, 10, 7, 9]

// 改善的计数排序，保证排序的稳定性
function countingSort(array) {

  let min, max
  min = max = array[0]

  // 找到数组中的最大值和最小值
  array.forEach((num) => {
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
  array.forEach((num) => {
    count[num - min]++
  })

  // 将计数数组改造为累加数组，用于计算下标
  for (let i = 1; i < count.length; i++) {
    count[i] = count[i - 1] + count[i]
  }

  // 倒序遍历原数组，将原数组中的元素插入到对应下标
  // 保证相同元素的相对位置保持不变，确保排序算法的稳定性
  let result = Array.from({ length: array.length })
  for (let i = array.length - 1; i >= 0; i--) {
    let j = array[i] - min
    result[--count[j]] = array[i]
  }

  return result
}

countingSort(array) // [ 3, 3, 5, 7, 7, 9, 10, 11, 11, 11 ]
```

#### 基数排序(RadixSort)

算法思路：

1. 对数组中整数的每一位（个位、十位、百位、千位、万位...）依次进行计数排序

适用于：非负整数的数据样本，不适用于负数和小数

稳定性：稳定

时间复杂度：O(n × k)

空间复杂度：O(n + k)

```js
let array = [126, 69, 593, 23, 6, 89, 54, 8, 31, 412]

function radixSort(array) {

  // 找到最大值，确定元素的最高位数
  let max = array[0]
  array.forEach((num) => {
    if (num > max) max = num
  })

  // 根据最大值的位数确定计数排序的次数
  let digit = String(max).length
  for (let radix = 0; radix < digit; radix++) {
    array = countingSort(array, radix)
  }
  
  return array

  function countingSort(array, radix) {

    // 每个进制位的取值范围是 0-9，所以计数数组长度为 10
    let count = Array.from({ length: 10 }).fill(0)

    // 统计当前进制位上的数字出现的次数
    array.forEach((num) => {
      count[(num / (10 ** radix) >> 0) % 10]++
    })

    // 对计数数组进行累加
    for (let i = 1; i < count.length; i++) {
      count[i] = count[i - 1] + count[i]
    }

    // 倒序遍历原数组，将元素插入到新数组的对应位置
    let result = Array.from({ length: array.length })
    for (let i = array.length - 1; i >= 0; i--) {
      let j = (array[i] / (10 ** radix) >> 0) % 10
      result[--count[j]] = array[i]
    }
    // console.log(result) // 打印每轮排序后的结果

    return result
  }
}

radixSort(array) // [ 6, 8, 23, 31, 54, 69, 89, 126, 412, 593 ]
```

```js
let array = [126, 69, 593, 23, 6, 89, 54, 8, 31, 412]

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
    // console.log(result) // 打印每轮排序后的结果
    array = result
  }

  return array
}

radixSort(array) // [ 6, 8, 23, 31, 54, 69, 89, 126, 412, 593 ]
```

#### 桶排序(BucketSort)

算法思路：

1. 根据数组元素计算所需桶的个数，桶本质上是一个二维数组，横坐标表示桶的个数，纵坐标表示桶中的元素
2. 遍历数组，将数组元素按照一定的映射规则放入对应的桶中
3. 对每个桶进行排序，合并排序后的桶

稳定性：稳定

时间复杂度：O(n + k)

空间复杂度：O(n + k)

```js
let array = [27, 8, 6, 12, 36, 50, 21, 42, 0, 11]

function bucketSort(array) {

  let max = Math.max(...array)
  let min = Math.min(...array)

  // 计算桶的个数
  let bucketCount = Math.floor((max - min) / array.length) + 1
  let buckets = Array.from({ length: bucketCount }).map(() => [])

  // 按照一定的映射规则将数组元素映射到桶中
  array.forEach((num) => {
    buckets[Math.floor((num - min) / array.length)].push(num)
  })
  // console.log(buckets)

  // 对每个桶进行排序，然后合并排序后的桶
  let result = []
  buckets.forEach((bucket) => {
    if (bucket.length > 1) {
      insertionSort(bucket)
    }
    result.push(...bucket)
  })
  // console.log(result)

  return result

  function insertionSort(array) {
    for (let i = 1; i < array.length; i++) {
      for (let j = i; j > 0; j--) {
        if (array[j] < array[j - 1]) {
          [array[j - 1], array[j]] = [array[j], array[j - 1]]
        } else {
          break
        }
      }
    }
    return array
  }
}

bucketSort(array) // [ 0, 6, 8, 11, 12, 21, 27, 36, 42, 50 ]
```

> 面试题：js 中的 Array.prototype.sort() 使用了哪种排序算法？不传递参数会怎样？

1. sort 方法如果不传递比较函数，默认会将元素转为字符串，按照字符的 Unicode 码点逐个进行排序
   sort 方法如果传递比较函数：返回值小于 0，a 排在 b 的前面；返回值等于 0，a、b 的位置不变；返回值大于 0，b 排在 a 的前面

```js
[11, 101, 1000].sort() // [ 1000, 101, 11 ]
[11, 101, 1000].sort((a, b) => a - b) // [ 11, 101, 1000 ]
```

2. ES 规范并没有规定 sort 方法具体使用哪种排序算法，但要求排序算法是稳定的：
   - v8 引擎 7.0 版本之前，数组长度小于 10  时，使用插入排序，否则使用快速排序
   - v8 引擎 7.0 版本之后，因为快速排序是不稳定的排序算法，所以将快速排序改为了 TimSort，TimSort 是一种混合排序算法
   - [TimSort](https://mp.weixin.qq.com/s/zrhwCosK4fi3uCA9Gms3Lg) 先找出样本中的有序分区(run)，对这些小分区进行**插入排序**，然后再对已排好序的小分区进行**归并排序的合并操作**

>面试题：分别根据 num 和 name 属性对下列对象进行排序。

```js
var arr = [
  { name: 'A', num: 4 },
  { name: 'G', num: 3 },
  { name: 'V', num: 5 },
  { name: 'A', num: 2 },
  { name: 'X', num: 9 },
  { name: 'R', num: 6 },
  { name: 'N', num: undefined },
]

// 根据 num 排序
arr.sort((a, b) => a.num - b.num)
// [
//   { name: 'A', num: 2 },
//   { name: 'G', num: 3 },
//   { name: 'A', num: 4 },
//   { name: 'V', num: 5 },
//   { name: 'R', num: 6 },
//   { name: 'X', num: 9 },
//   { name: 'N', num: undefined }
// ]

// 根据 name 排序
arr.sort((a, b) => {
  if (a.name < b.name)
    return -1
  
  if (a.name > b.name)
    return 1
  
  return 0
})
// [
//   { name: 'A', num: 2 },
//   { name: 'A', num: 4 },
//   { name: 'G', num: 3 },
//   { name: 'N', num: undefined },
//   { name: 'R', num: 6 },
//   { name: 'V', num: 5 },
//   { name: 'X', num: 9 }
// ]
```

