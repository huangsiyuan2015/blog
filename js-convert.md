## 类型转换

js 中的类型转换主要分为：

1. 原始类型之间的转换
2. 原始类型和引用类型之间的转化

### 隐式转换

代码在执行的过程中，自动发生数据类型转换的过程称为隐式转换，隐式转换基于显式转换。

### 显式转换

通过调用 Number()/String()/Boolean() 等方法直接转换数据类型的方式称为显式转换。

#### 原始类型 ⇄ 原始类型

1. Number
   - number => string
     - String()
       - 数值转为对应字符串形式，`String(10) => '10'`
   - number => boolean
     - Boolean()
       - 0 和 NaN 转为 false，`Boolean(NaN) => false`
       - 其余都转为 true
   - number ×=> null/undefined/symbol
2. String
   - string => number
     - Number()
       - 纯数字字符转为对应数值，`Number('10') => 10`
       - 整体转换，包含非数字字符一律转为 NaN，`Number('12a') => NaN`
         - 浮点数除外，`Number('.1') => 0.1`
         - 科学计数法除外，`Number('1e-2') => 0.01`
         - 二进制0b/八进制0o/十六进制0x除外，`Number('0b11') => 3`
     - parseInt()
       - 逐个转换，从首字符开始转换，遇到不能转换的字符返回已经转好的部分，`parseInt('12a') => 12`
       - 首字符不能转换，直接返回 NaN，`parseInt('a12') => NaN`
       - 不能转换浮点数和科学计数法，`parseInt('1.2') => 1`，`parseInt('1e2') => 1`
     - parseFloat()
       - 逐个转换，和 parseInt() 类似
       - 可以转换浮点数和科学计数法，`parseFloat('1.2') => 1.2`，`parseFloat('1e2') => 100`
   - string => boolean
     - Boolean()
       - 空字符串转为 false，`Boolean('') => false`
       - 其它字符都转为 true，包括空格符、换行符、制表符等，`Boolean(' ') => true`
   - string ×=> null/undefined/symbol
3. Boolean
   - boolean =>  number
     - Number()
       - false 转为 0，true 转为 1，`Number(true) => 1`
   - boolean => string
     - String()
       - 布尔值转为对应字符串形式，`String(true) => 'true'`
   - boolean ×=> null/undefined/symbol
4. Null
   - null => number
     - Number()
       - null 转为数值为 0，`Number(null) => 0`
   - null => string
     - String()
       - null 转为对应字符串形式，`String(null) => 'null'`
   - null => boolean
     - Boolean()
       - null 转为布尔值为 false，`Boolean(null) => false`
   - null ×=> undefined/symbol
5. Undefined
   - undefined => number
     - Number()
       - undefined 转为数值为 NaN，`Number(undefined) => NaN`
   - undefined => string
     - String()
       - undefined 转为对应字符串形式，`String(undefined) => 'undefined'`
   - undefined => boolean
     - Boolean()
       - undefined 转为布尔值为 false，`Boolean(undefined) => false`
   - undefined ×=> null/symbol
6. Symbol
   - symbol ×=> number/string/boolean/null/undefined

#### 原始类型 ⇄ 引用类型

