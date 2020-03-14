// Ф-ция, которую надо реализовать
const reduce = async (array, fn, initialValue, cb) => {
  const promisifiedLength = promisify(array.length);
  const promisifiedGet = promisify(array.get);

  let length = await promisifiedLength();

  // Определяем условия для краевых случаев
  let [isEmptyArr, isShortArray, isInitialAbsent] = await Promise.all([
    await promisifiedEqual(length, 0),
    await promisifiedEqual(length, 1),
    await promisifiedEqual(initialValue, undefined)
  ]);

  // Обрабатываем каревые случаи, чтобы лишний раз не гонять цикл
  if (isEmptyArr && isInitialAbsent) throw new Error('Ошибка, передан пустой массив и не задано начальное значение');
  else if (isEmptyArr && !isInitialAbsent) return initialValue;
  else if (isShortArray && isInitialAbsent) return promisifiedGet(0);
  else {
    let idx = 0;
    let acc;
    if (initialValue) {
      acc = initialValue;
    }
    else {
      [acc, idx] = await Promise.all([
        await promisifiedGet(idx),
        await promisifiedAdd(idx, 1)
      ]);
    }
    while (await promisifiedLess(idx, length)) {
      [acc, idx] = await Promise.all([
        await fn(acc, await promisifiedGet(idx), idx, array),
        await promisifiedAdd(idx, 1)
      ]);
    }
    return acc;
  }
};

window.reduce = reduce;

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

// Ф-ция промисификации
const promisify = function(cb) {
  return function promisified() {
    const args = [].slice.call(arguments);
    return new Promise((resolve, reject) => {
      args.push((result) => resolve(result));
      cb.apply(null, args);
    });
  }
};

// Промифицирруем ф-ци тут (а не внутри reduce),
// потому что они нам нужны и в передаваемых в reduce ф-циях обработки fn.

// Промисифицируем функции, использующиеся в самом reduce
const promisifiedEqual = promisify(equal);
const promisifiedLess = promisify(less);
const promisifiedAdd = promisify(add);

// Промисифицируем функции, использующиеся в fn
const promisifiedSubtract = promisify(subtract);
const promisifiedDivide = promisify(divide);

// Промисифируем остальные функции (на всякий случай)
const promisifiedMultiply = promisify(multiply);
const promisifiedMod = promisify(mod);
const promisifiedLessOrEqual = promisify(lessOrEqual);
const promisifiedSqrt = promisify(sqrt);

// ===== Мини-проверка =====
// Исходные массивы. Асинхронные
const arrayEmpty = new AsyncArray([]);
const arrayOneElem = new AsyncArray([14]);
const arrayNum1 = new AsyncArray([10, 20, 30, 40, 50]);
const arrayNum2 = new AsyncArray([14, -3, 9, 17, 0, -5, 5, -5, 13]);
const arrayFloats = new AsyncArray([45.3, 12.34, 14.5, 24, 39.02]);
const arrayStrings = new AsyncArray(['too','old','for','this','shit']);
const arrayArrays = new AsyncArray([[0, 1], [2, 3], [4, 5]]);

// Примеры ф-ций обработки для использования в reduce ( в том числе асинхронные )
const fnSum = async (acc, cur, idx, src) => await promisifiedAdd(acc, cur);
const fnMax = (acc, cur, idx, array) => Math.max(acc, cur);
const fnAverage = async (acc, cur, idx, src) => {
  let length = await (promisify(src.length))();
  let lastIdx = await promisifiedSubtract(length, 1);
  let isLastIdx = await promisifiedEqual(idx, lastIdx);
  acc = await promisifiedAdd(acc, cur);
  if (isLastIdx) acc = await promisifiedDivide(acc, length);
  return acc;
};
const fnJoin = (acc, cur, idx, src) => [acc, cur].join(' ');
const fnConcat = (acc, cur, idx, src) => acc.concat(cur);

// Колбэк
const cb = (result) => { console.log(result) };

console.log('======= Acинхронный reduce (через async/await =============');
// Вызов ф-ции reduce - ответы в консоли будут выведены в асинхронном порядке
reduce(arrayEmpty, fnSum, null, cb)
  .then((result) => cb(result))
  .catch((err) => console.log(`Ошибка: ${err}`));         // Error

reduce(arrayEmpty, fnSum, 39, cb)
  .then((result) => cb(result))
  .catch((err) => console.log(`Ошибка: ${err}`));           // 39

reduce(arrayOneElem, fnSum, null, cb)
  .then((result) => cb(result))
  .catch((err) => console.log(`Ошибка: ${err}`));       // 14

reduce(arrayOneElem, fnSum, 39, cb)
  .then((result) => cb(result))
  .catch((err) => console.log(`Ошибка: ${err}`));         // 53

reduce(arrayNum1, fnSum, null, cb)
  .then((result) => cb(result))
  .catch((err) => console.log(`Ошибка: ${err}`));          // 150

reduce(arrayNum1, fnSum, 5, cb)
  .then((result) => cb(result))
  .catch((err) => console.log(`Ошибка: ${err}`));             // 155

reduce(arrayNum2, fnMax, null, cb)
  .then((result) => cb(result))
  .catch((err) => console.log(`Ошибка: ${err}`));          // 17

reduce(arrayFloats, fnAverage, null, cb)
  .then((result) => cb(result))
  .catch((err) => console.log(`Ошибка: ${err}`));    // 27.032

reduce(arrayStrings, fnJoin, null, cb)
  .then((result) => cb(result))
  .catch((err) => console.log(`Ошибка: ${err}`));      // "too old for this shit"

reduce(arrayStrings, fnJoin, "Never", cb)
  .then((result) => cb(result))
  .catch((err) => console.log(`Ошибка: ${err}`));   // "Never too old for this shit"

reduce(arrayArrays, fnConcat, null, cb)
  .then((result) => cb(result))
  .catch((err) => console.log(`Ошибка: ${err}`));     // [0, 1, 2, 3, 4, 5]

reduce(arrayArrays, fnConcat, [-2, -1], cb)
  .then((result) => cb(result))
  .catch((err) => console.log(`Ошибка: ${err}`)); // [-2, -1, 0, 1, 2, 3, 4, 5]



