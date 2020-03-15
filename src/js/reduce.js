// Ф-ция, которую надо реализовать
const reduce = async (array, fn, initialValue, cb) => {
  // Оборачиваем всю логику в анонимную асинхронную ф-цию
  // Чтобы вызывать колбэк ПОСЛЕ завершения всех вычислений
  // И ловить ошибки, выводя сообщение в консоль, но не руша дальнейшее выполнение скриптов
  return (async () => {
    // Промифицируем ф-ции внешнего API, которые используются в reduce
    const promisifiedLength = promisify(array.length);
    const promisifiedGet = promisify(array.get);

    // Кэшируем длинну массива
    const length = await promisifiedLength();

    // Определяем условия для краевых случаев
    const [isEmptyArr, isShortArray, isInitialAbsent] = await Promise.all([
      await promisifiedEqual(length, 0),
      await promisifiedEqual(length, 1),
      await promisifiedEqual(initialValue, undefined)
    ]);

    // Обрабатываем каревые случаи, чтобы лишний раз не гонять цикл
    if (isEmptyArr && isInitialAbsent) throw new TypeError('Передан пустой массив и не задано начальное значение');
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
  })()
    .then(result => {
      cb(result);
      return result;
    })
    .catch(err => console.error(`${err}`));
};

// Записываем в глобальную переменную, чтобы был доступ к ф-ции извне
window.reduce = reduce;

// Вызываем
const {
  AsyncArray,
  add,
  subtract,
  divide,
  less,
  equal
} = Homework;

// Ф-ция промисификации
// В реальном проекте ее надо бы внести внутрь reduce.
// Но тут она используется и для промисификации внутри тестовых ф-ций (fn)
// поэтому выведна в общую область видимости
const promisify = cb => {
  return function promisified() {
    const args = [].slice.call(arguments);
    return new Promise((resolve, reject) => {
      args.push(result => resolve(result));
      cb.apply(null, args);
    });
  };
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
// const promisifiedMultiply = promisify(multiply);
// const promisifiedMod = promisify(mod);
// const promisifiedLessOrEqual = promisify(lessOrEqual);
// const promisifiedSqrt = promisify(sqrt);

// ===== Мини-проверка =====
// Исходные массивы. Асинхронные
const arrayEmpty = new AsyncArray([]);
const arrayOneElem = new AsyncArray([14]);
const arrayNum1 = new AsyncArray([10, 20, 30, 40, 50]);
const arrayNum2 = new AsyncArray([14, -3, 9, 17, 0, -5, 5, -5, 13]);
const arrayFloats = new AsyncArray([45.3, 12.34, 14.5, 24, 39.02]);
const arrayStrings = new AsyncArray(['too', 'old', 'for', 'this', 'shit']);
const arrayArrays = new AsyncArray([[0, 1], [2, 3], [4, 5]]);

// Примеры ф-ций обработки для использования в reduce (в том числе асинхронные )
const fnSum = async (acc, cur, idx, src) => await promisifiedAdd(acc, cur);
const fnMax = (acc, cur, idx, array) => Math.max(acc, cur);
const fnAverage = async (acc, cur, idx, src) => {
  const length = await (promisify(src.length))();
  const lastIdx = await promisifiedSubtract(length, 1);
  const isLastIdx = await promisifiedEqual(idx, lastIdx);
  acc = await promisifiedAdd(acc, cur);
  if (isLastIdx) acc = await promisifiedDivide(acc, length);
  return acc;
};
const fnJoin = (acc, cur, idx, src) => [acc, cur].join(' ');
const fnConcat = (acc, cur, idx, src) => acc.concat(cur);

// Колбэк
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
