const {
  AsyncArray,
  add,
  subtract,
  multiply,
  divide,
  mod,
  less,
  equal,
  lessOrEqual,
  sqrt
} = Homework;

// Исходный массив
const arrayEmpty = new AsyncArray([]);
const arrayOneElem = new AsyncArray([14]);
const array1 = new AsyncArray([3, 2, 1]);
const array2 = new AsyncArray([[0, 1], [2, 3], [4, 5]]);

// Ф-ции обработки reduce
const fn1 = (acc, cur, idx, array) => { return acc * cur };
const fn2 = (acc, cur, idx, array) => { return acc.concat(cur) };

// Колбэк
const cb = (result) => { console.log(result) };

// Ф-ция промисификации
const promisify = function(callbackBasedApi) {
  return function promisified() {
    const args = [].slice.call(arguments);
    return new Promise((resolve, reject) => {
      args.push((result) => resolve(result));
      callbackBasedApi.apply(null, args);
    });
  }
};

// reduce(arrayEmpty, fn1, undefined, cb);
// reduce(arrayEmpty, fn1, 33, cb);
// reduce(arrayOneElem, fn1, undefined, cb);
reduce(array1, fn1, 5, cb);
// reduce(array2, fn2, undefined, cb);
// console.log(reduce(array, fn, null, cb));

function reduce(array, fn, initialValue, cb) {
  // Промисифицируем необходимые для работы функции
  const promisifiedLength = promisify(array.length);
  const promisifiedEqual = promisify(equal);
  const promisifiedLess = promisify(less);
  const promisifiedGet = promisify(array.get);
  const promisifiedAdd = promisify(add);

  (async function () {
    let length = await promisifiedLength();
    let isEmptyArr = await promisifiedEqual(length, 0);
    let isShortArray = await promisifiedEqual(length, 1);
    let isInitialAbsent = await promisifiedEqual(initialValue, undefined);

    if (isEmptyArr && isInitialAbsent) throw Error();
    else if (isEmptyArr && !isInitialAbsent) return initialValue;
    else if (isShortArray && isInitialAbsent) return promisifiedGet(0);
    else {
      let idx = 0;
      let acc = (initialValue) ? initialValue : 0;
      while (await promisifiedLess(idx, length)) {
        let cur = await promisifiedGet(idx);
        acc = fn(acc, cur, idx, array);
        idx = await promisifiedAdd(idx, 1);
      }
      return acc;
    }
  })()
    .then((result) => {
      cb(result);
    }).catch((err) => {
      console.log(`Ошибка: ${err}`);
    });

  // Попробовтаь написать чисто на Promise
  // const loop = (idx, length) => {
  //   promisifiedLess(idx, length)
  //     .then((isLess) => {
  //       if (isLess) return promisifiedGet(idx);
  //       else return;
  //     })
  //     .then((cur) => {
  //       acc = fn(acc, cur, idx, array);
  //       return acc
  //     });
  //   if (idx < length) {
  //       acc = fn(acc, arr1[idx], idx, arr1);
  //       idx++;
  //
  //     }
  //   }
  // };
  // let data = {};
  // promisifiedLength()
  //   .then((length) => {
  //     data.length = length;
  //     return Promise.all([
  //       promisifiedEqual(length, 0),
  //       promisifiedEqual(length, 1),
  //       promisifiedEqual(initialValue, undefined),
  //     ]);
  //   })
  //   .then((args) => {
  //     const [isEmptyArr, isShortArray, isInitialAbsent] = args;
  //     if (isEmptyArr && isInitialAbsent) throw Error();
  //     else if (isEmptyArr && !isInitialAbsent) return initialValue;
  //     else if (isShortArray && isInitialAbsent) return promisifiedGet(0);
  //     else {
  //       // return 5;
  //       // let arr1 = [[0, 1], [2, 3], [4, 5]];
  //       debugger
  //       // let idx = 0;
  //       // let acc = (initialValue) ? initialValue : 0;
  //       // while (idx < data.length) {
  //       //   acc = fn(acc, arr1[idx], idx, arr1);
  //       //   idx++;
  //       // }
  //       // return acc;
  //     }
  //   })
  //   .then((result) => {
  //     console.log('result: ', result);
  //   })
  //   .catch((error) => console.log(error));


  //
  // if (length === 0 && !initialValue) throw Error();
  // else if (length === 0 && initialValue) return initialValue;
  // else if (length === 1 && !initialValue) return array[0];
  // else {
  //   let idx = 0;
  //   let acc = (initialValue) ? initialValue : 0;
  //   while (idx < length) {
  //     acc = fn(acc, array[idx], idx, array);
  //     idx++;
  //   }
  //   return acc;
  // }

}


