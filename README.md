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

 Результат работы выводится в консоль DevTools

# Структура исходных файлов
  - `pages/index.html` - страница, подключающая скрипты.
  - `js/reduce` - основная реализация асинхронной функции reduce (с использованием async/await)
  - `js/checkReduce` - типа тесты. Несколько вызовов reduce для разных массивов и ф-ций обработки fn
  
  Дополнительно реализованы:
  - `js/reduceSync` - реализация синхронной функции reduce (как пример общей логики работы reduce)
  - `js/checkReduceSync` - типа тесты.
  - `js/reducePromise` - дополнительная реализация асинхронной функции reduce (БЕЗ использования async/await)
  
  Чтобы увидеть результаты их работы, надо раскомментировать в [build/index.html](build/index.html) соответсвующие строки
  
# Примечание
Касательно основной асинхронной ф-ции reduce.
По условию задачи и в результате общения в чатике так до конца и не понял, нужно ли делать
синхронные операции асинхронными только в самом reduce или в fn тоже.
Выбрал такое решение:
Там где в логике fn асинхронный массив (`fnAverage`) используетсядля вычислений (array[idx], array.length) - подменял логику на асинхронную.
Там где не используется (`fnSum`, `fnJoin`) - оставляю обычную синхронную.
