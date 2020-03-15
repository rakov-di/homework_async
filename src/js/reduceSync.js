// Синхронная ф-ция reduce
const reduceSync = (array, fn, initialValue, cb) => {
  // Оборачиваем всю логику в try..catch
  // Чтобы ловить ошибки, выводя сообщение в консоль,
  // но не руша дальнейшее выполнение скриптов
  try {
    let result;

    // Обрабатываем каревые случаи, чтобы лишний раз не гонять цикл
    if (array.length === 0 && !initialValue) throw new TypeError('Ошибка, передан пустой массив и не задано начальное значение');
    else if (array.length === 0 && initialValue) result = initialValue;
    else if (array.length === 1 && !initialValue) result = array[0];
    else {
      // Основная логика
      let idx = 0;
      let acc;

      // Определяем начальные значения
      if (initialValue) {
        acc = initialValue;
      }
      else {
        acc = array[idx];
        idx++;
      }

      // Запускаем цикл по массиву
      while (idx < array.length) {
        acc = fn(acc, array[idx], idx, array);
        idx++;
      }
      result = acc;
    }

    cb(result);
    return result;
  }
  catch(err) {
    console.error(err);
  }
};

// Записываем в глобальную переменную, для быстрого доступ к ф-ции извне
window.reduceSync = reduceSync;
