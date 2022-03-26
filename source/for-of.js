var obj = {
  foo: 'html',
  bar: 'css',
  baz: 'js',
  // [Symbol.iterator]: function () {
  //   var current = this
  //   var keys = Object.keys(current)
  //   var index = 0

  //   return {
  //     next: function () {
  //       return index < keys.length
  //         ? {
  //             done: false,
  //             value: keys[index++],
  //           }
  //         : {
  //             done: true,
  //             value: undefined,
  //           }
  //     },
  //   }
  // },
}

Object.prototype[Symbol.iterator] = function () {
  var current = this
  var keys = Object.keys(current)
  var index = 0

  return {
    next: function () {
      return index < keys.length
        ? {
            done: false,
            value: keys[index++],
          }
        : {
            done: true,
            value: undefined,
          }
    },
  }
}

// for (var key of obj) {
//   console.log(key, obj[key])
// }

var it = obj[Symbol.iterator]()
console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())
