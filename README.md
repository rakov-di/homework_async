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
 - На странице [GitHub Pages](https://rakov-di.github.io/) - результат выводится в консоль DevTools.
 - На своем локальном комьютере. Необходимо скачать репозиторий, установить npm-пакеты, выполнить сборку и открыть в браузере файл `build/index.html`.
```git
    git clone git@github.com:rakov-di/homework_async.git
    cd homework_async
    npm i
    npm run build
```

# Структура исходных файлов
  - `js/reduceSync` - реализация синхронной функции reduce (как пример общей логики работы reduce)
  - `js/reduce` - основная реализация асинхронной функции reduce (с использованием async/await)
  - `js/reducePromise` - дополнительная реализация асинхронной функции reduce (БЕЗ использования async/await)
  - `pages/index.html` - страница, подключающая скрипты (по умолчанию, подключается только асинхронная функция reduce, остальные подключения закомментированы)
  
  В каждом js-файлы есть несколько тестовых вызовов reduce.

