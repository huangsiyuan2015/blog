### 数组排序

#### 简单排序

##### 冒泡排序

冒泡排序的原理：每次遍历数组相邻元素两两比较，较大的元素放在右边，这样每遍历一次后末尾一定是最大值；剩下的元素又作为一个新数组，重复上一个过程。这样每次最大值都依次放在了末尾，形成了有序数组。

```js
let arr = [9, 3, 6, 5, 1]

function bubbleSort(arr) {
  // 外循环控制遍历次数，5个元素只需要遍历4次
  for (let j = arr.length - 1; j > 0; j--) {
    // 内循环控制比较次数，每遍历一次后最右边总是最大值，可以少比较一次
    for (let i = 0; i < j; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i]
        arr[i] = arr[i + 1]
        arr[i + 1] = temp
      }
    }
  }
  return arr
}

bubbleSort(arr) // [ 1, 3, 5, 6, 9 ]
```

##### 选择排序

选择排序的原理：每次遍历数组找出最小值的下标，然后将最小值放在首位；剩下的元素又作为一个新数组，重复上一个过程。这样每次最小值都依次放在了首位，形成了有序数组。

```js
let arr = [9, 3, 6, 5, 1]

function selectionSort(arr) {
	// 外循环控制遍历次数，5个元素只需要遍历4次
  for (let j = 0; j < arr.length - 1; j++) {
    let minIndex = j
    // 内循环控制比较次数，每次遍历找出最小值的下标，然后交换首位和最小值
    for (let i = j + 1; i < arr.length; i++) {
      if (arr[i] < arr[minIndex]) {
        minIndex = i
      }
    }
    let temp = arr[j]
    arr[j] = arr[minIndex]
    arr[minIndex] = temp
  }
  return arr
}

selectionSort(arr) // [ 1, 3, 5, 6, 9 ]
```

##### 插入排序

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
        break;
      }
    }
  }
  return arr
}

insertionSort(arr) // [ 1, 3, 5, 6, 9 ]
```

#### 复杂排序

##### 希尔排序（插排优化）

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
