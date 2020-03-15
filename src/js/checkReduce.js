// ===== Вместо тестов =====

// Вызываем API
const {
  AsyncArray,
  add,
  subtract,
  divide,
  equal
} = Homework;

// Исходные массивы для теста. Асинхронные
const arrayEmpty = new AsyncArray([]);
const arrayOneElem = new AsyncArray([14]);
const arrayNum1 = new AsyncArray([10, 20, 30, 40, 50]);
const arrayNum2 = new AsyncArray([14, -3, 9, 17, 0, -5, 5, -5, 13]);
const arrayFloats = new AsyncArray([45.3, 12.34, 14.5, 24, 39.02]);
const arrayStrings = new AsyncArray(['too', 'old', 'for', 'this', 'shit']);
const arrayArrays = new AsyncArray([[0, 1], [2, 3], [4, 5]]);

// Ф-ция промисификации
// Тут она используется для промисификации внутри тестовых ф-ций (fn)
const promisify = cb => {
  return function promisified() {
    const args = [].slice.call(arguments);
    return new Promise((resolve, reject) => {
      args.push(result => resolve(result));
      cb.apply(null, args);
    });
  };
};

// Промисифицируем функции, использующиеся в fn
const promisifiedEqual = promisify(equal);
const promisifiedSubtract = promisify(subtract);
const promisifiedDivide = promisify(divide);
const promisifiedAdd = promisify(add);

// По условию задачи не понятно, нужно ли заменять
// синхронные операции асинхронными только в самом reduce или в fn тоже.
// Выбрал такое решение:
// Там где в логике fn используется асинхронный массив (fnAverage) - подменяю логику на асинхронную
// Там где не используется (fnSum, fnJoin) - оставляю обычную синхронную

// Примеры ф-ций обработки для использования в reduce (в том числе асинхронные )
// const fnSum = async (acc, cur, idx, src) => await promisifiedAdd(acc, cur);
const fnSum = (acc, cur, idx, src) => acc + cur;
const fnMax = (acc, cur, idx, array) => Math.max(acc, cur);
const fnAverage = async (acc, cur, idx, src) => {
  const length = await (promisify(src.length))();
  const lastIdx = await promisifiedSubtract(length, 1);
  const isLastIdx = await promisifiedEqual(idx, lastIdx);
  acc = await promisifiedAdd(acc, cur);
  if (isLastIdx) acc = await promisifiedDivide(acc, length);
  return acc;
};
const fnJoin = (acc, cur, idx, src) => [acc, cur].join(' '); // Вместо
const fnConcat = (acc, cur, idx, src) => acc.concat(cur);

// Колбэк (общий для всех вызовов)
const cb = result => console.log(`Сработал колбэк для результата: ${result}`);

console.log('======= Acинхронный reduce (через async/await) =============');
// Вызов ф-ции reduce
// reduce - асинхронная функция, поэтому запускать свои колбэки
// и отдавать результаты она будет в случайном порядке (по мере завершения работы).
// Чтобы сохранить порядок выдачи реузьтатов - оборачиваем все в Promise.all
Promise.all([
  reduce(arrayEmpty, fnSum, null, cb),         // Error
  reduce(arrayEmpty, fnSum, 39, cb),           // 39
  reduce(arrayOneElem, fnSum, null, cb),       // 14
  reduce(arrayOneElem, fnSum, 39, cb),         // 53
  reduce(arrayNum1, fnSum, null, cb),          // 150
  reduce(arrayNum1, fnSum, 5, cb),             // 155
  reduce(arrayNum2, fnMax, null, cb),          // 17
  reduce(arrayFloats, fnAverage, null, cb),    // 27.032
  reduce(arrayStrings, fnJoin, null, cb),      // "too old for this shit"
  reduce(arrayStrings, fnJoin, 'Never', cb),   // "Never too old for this shit"
  reduce(arrayArrays, fnConcat, null, cb),     // [0, 1, 2, 3, 4, 5]
  reduce(arrayArrays, fnConcat, [-2, -1], cb) // [-2, -1, 0, 1, 2, 3, 4, 5]
]).then(results => {
  results.forEach(result => console.log(`А вот и сам результат: ${result}`));
}).catch(err => console.log(`ОШибкаааа ${err}`));

// Для пошагового вызова результатов можно раскомментировать этот код - это типа замедление, как в Матрице
// (async () => {
//   await reduce(arrayEmpty, fnSum, null, cb);         // Error
//   await reduce(arrayEmpty, fnSum, 39, cb);           // 39
//   await reduce(arrayOneElem, fnSum, null, cb);       // 14
//   await reduce(arrayOneElem, fnSum, 39, cb);         // 53
//   await reduce(arrayNum1, fnSum, null, cb);          // 150
//   await reduce(arrayNum1, fnSum, 5, cb);             // 155
//   await reduce(arrayNum2, fnMax, null, cb);          // 17
//   await reduce(arrayFloats, fnAverage, null, cb);    // 27.032
//   await reduce(arrayStrings, fnJoin, null, cb);      // "too old for this shit"
//   await reduce(arrayStrings, fnJoin, 'Never', cb);   // "Never too old for this shit"
//   await reduce(arrayArrays, fnConcat, null, cb);     // [0, 1, 2, 3, 4, 5]
//   await reduce(arrayArrays, fnConcat, [-2, -1], cb); // [-2, -1, 0, 1, 2, 3, 4, 5]
// })();
