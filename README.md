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
# Описание

Реализовал асинхронную функцию reduce с использованием `async/await`, предварительно промисифицировав необходимые методы из предоставленного API. Для параллельных операций использовал `Promise.all`, при работе с которым применял массивы (для передачи нескольких промисов и получения результатов через деструктуризацию): ```const [val1, val2] = Promise.all([promise1, promise2])```. Как я понял, для `Promise.all` массивы применять можно, нельзя только для работы с исходным массивом.

В целом, по условию задачи и в результате общения в чатике так до конца и не понял, нужно ли делать синхронные операции асинхронными только в самом `reduce` или в `fn` (функция обработки массива, передающаяся в `reduce` качестве параметра) тоже.

Выбрал такое решение:
- Там где в логике `fn` асинхронный массив (например, `fnAverage`) используется для вычислений (`array[idx]`, `array.length`) - подменял логику на асинхронную.
- Там где не используется (например, `fnSum`, `fnJoin`) - оставляю обычную синхронную.

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
  - `js/reduce` - основная реализация асинхронной функции `reduce` (с использованием `async/await`).
  - `js/checkReduce` - типа тесты. Несколько вызовов `reduce` для разных массивов и функций обработки fn.
  
  Дополнительно реализованы:
  - `js/reduceSync` - реализация синхронной функции `reduceSync`, для сравнения с асинхронным reduce.
  - `js/checkReduceSync` - типа тесты для `reduceSync`.

  Чтобы увидеть результаты работы дополнительных функций, надо раскомментировать в [build/index.html](build/index.html) соответствующие строки и пересобрать ресурсы.
  

