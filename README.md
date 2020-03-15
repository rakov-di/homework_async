# Домашнее задание ШРИ по теме “Асинхронность”

Вариант 9 - Реализовать операцию reduce для асинхронного массива.
```js
function reduce(
    array: AsyncArray,
    fn: (acc: any, cur: any, idx: Number, src: AsyncArray) => any,
    initialValue: any,
    cb: (result: any) => void) {
}
```

# Демо 

Увидеть результат работы асинхронной ф-ции reduce можно 2 способами:
 - На странице [GitHub Pages](https://rakov-di.github.io/).
 - На своем локальном комьютере. Необходимо скачать репозиторий, установить npm-пакеты, выполнить сборку и открыть в браузере файл [build/index.html](build/index.html).
```git
    git clone git@github.com:rakov-di/homework_async.git
    cd homework_async
    npm i
    npm run build
```

 Результат работы выводится в консоль DevTools.

# Структура исходных файлов
  Основные:
  - `pages/index.html` - страница, подключающая скрипты.
  - `shri-async-hw.js` - API Homework.
  - `js/reduce` - основная реализация асинхронной функции reduce (с использованием async/await).
  - `js/checkReduce` - типа тесты. Несколько вызовов reduce для разных массивов и ф-ций обработки fn.
  
  Дополнительно реализованы:
  - `js/reduceSync` - реализация синхронной функции reduceSync, для сравнения с асинхронным reduce.
  - `js/checkReduceSync` - типа тесты для reduceSync.
  - `js/reducePromise` - дополнительная реализация асинхронной функции reducePromise (асинхронный reduce, н оБЕЗ использования async/await в самом reducePromise)
  
  Чтобы увидеть результаты работы дополнительных функций, надо раскомментировать в [build/index.html](build/index.html) соответствующие строки.
  
# Примечание
Касательно основной асинхронной ф-ции reduce.
По условию задачи и в результате общения в чатике так до конца и не понял, нужно ли делать
синхронные операции асинхронными только в самом `reduce` или в `fn` тоже.

Выбрал такое решение:
- Там где в логике `fn` асинхронный массив (`fnAverage`) используетсядля вычислений (`array[idx]`, `array.length`) - подменял логику на асинхронную.
- Там где не используется (`fnSum`, `fnJoin`) - оставляю обычную синхронную.
