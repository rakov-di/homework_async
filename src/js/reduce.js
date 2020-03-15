// Ф-ция, которую надо реализовать
const reduce = async (array, fn, initialValue, cb) => {
  // Оборачиваем всю логику в анонимную асинхронную ф-цию
  // Чтобы вызывать колбэк ПОСЛЕ завершения всех вычислений
  // и ловить ошибки, выводя сообщение в консоль, но не руша дальнейшее выполнение скриптов
  return (async () => {
    // Проверяем, подключено ли API Homework и является ли ппереданный массив асинхронным
    if (!window.Homework) throw new Error('Не подключено API Homework, необходимое для работы фунции reduce');
    if (!(array instanceof window.Homework.AsyncArray)) throw new Error('Передан не асинхронный массив');

    // Ф-ция промисификации (для превращения всех асинхронных колбэков API Homework в промисы)
    const promisify = cb => {
      return function promisified() {
        const args = [].slice.call(arguments);
        return new Promise((resolve, reject) => {
          args.push(result => resolve(result));
          cb.apply(null, args);
        });
      };
    };

    // Промифицируем ф-ции внешнего API, которые используются в reduce
    const promisifiedEqual = promisify(window.Homework.equal);
    const promisifiedLess = promisify(window.Homework.less);
    const promisifiedAdd = promisify(window.Homework.add);
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
      // Основная логика
      let idx = 0;
      let acc;
      // Определяем начальные значения
      if (initialValue) {
        acc = initialValue;
      }
      else {
        [acc, idx] = await Promise.all([
          await promisifiedGet(idx),
          await promisifiedAdd(idx, 1)
        ]);
      }
      // Запускаем цикл по массиву
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
    .catch(err => console.error(err));
};

// Записываем в глобальную переменную, для быстрого доступ к ф-ции извне
window.reduce = reduce;
