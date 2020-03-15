// ===== Вместо тестов =====

// Исходные массивы. Обычные
const arraySyncEmpty = [];
const arraySyncOneElem = [14];
const arraySyncNum1 = [10, 20, 30, 40, 50];
const arraySyncNum2 = [14, -3, 9, 17, 0, -5, 5, -5, 13];
const arraySyncFloats = [45.3, 12.34, 14.5, 24, 39.02];
const arraySyncStrings = ['too', 'old', 'for', 'this', 'shit'];
const arraySyncArrays = [[0, 1], [2, 3], [4, 5]];

// Ф-ции обработки массивов для reduce. Обычные
const fnSum = (acc, cur, idx, array) => acc + cur;
const fnMax = (acc, cur, idx, array) => Math.max(acc, cur);
const fnAverage = (acc, cur, idx, array) => {
  return (idx === array.length - 1) ? (acc + cur) / array.length : acc + cur;
};
const fnJoin = (acc, cur, idx, array) => [acc, cur].join(' ');
const fnConcat = (acc, cur, idx, array) => acc.concat(cur);

// Колбэк
const cb = result => console.log(result);

console.log('======= Синхронный reduce =============');
reduceSync(arraySyncEmpty, fnSum, null, cb);         // Error
reduceSync(arraySyncEmpty, fnSum, 39, cb);           // 39
reduceSync(arraySyncOneElem, fnSum, null, cb);       // 14
reduceSync(arraySyncOneElem, fnSum, 39, cb);         // 53
reduceSync(arraySyncNum1, fnSum, null, cb);          // 150
reduceSync(arraySyncNum1, fnSum, 5, cb);             // 155
reduceSync(arraySyncNum2, fnMax, null, cb);          // 17
reduceSync(arraySyncFloats, fnAverage, null, cb);    // 27.032
reduceSync(arraySyncStrings, fnJoin, null, cb);      // "too old for this shit"
reduceSync(arraySyncStrings, fnJoin, 'Never', cb);   // "Never too old for this shit"
reduceSync(arraySyncArrays, fnConcat, null, cb);     // [0, 1, 2, 3, 4, 5]
reduceSync(arraySyncArrays, fnConcat, [-2, -1], cb); // [-2, -1, 0, 1, 2, 3, 4, 5]
