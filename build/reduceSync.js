/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/reduceSync.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/reduceSync.js":
/*!**************************!*\
  !*** ./js/reduceSync.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Синхронная ф-ция reduce
var reduceSync = function reduceSync(array, fn, initialValue, cb) {
  // Оборачиваем всю логику в try..catch
  // Чтобы ловить ошибки, выводя сообщение в консоль,
  // но не руша дальнейшее выполнение скриптов
  try {
    var result; // Обрабатываем каревые случаи, чтобы лишний раз не гонять цикл

    if (array.length === 0 && !initialValue) throw new TypeError('Ошибка, передан пустой массив и не задано начальное значение');else if (array.length === 0 && initialValue) result = initialValue;else if (array.length === 1 && !initialValue) result = array[0];else {
      // Основная логика
      var idx = 0;
      var acc; // Определяем начальные значения

      if (initialValue) {
        acc = initialValue;
      } else {
        acc = array[idx];
        idx++;
      } // Запускаем цикл по массиву


      while (idx < array.length) {
        acc = fn(acc, array[idx], idx, array);
        idx++;
      }

      result = acc;
    }
    cb(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}; // Записываем в глобальную переменную, для быстрого доступ к ф-ции извне


window.reduceSync = reduceSync;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanMvcmVkdWNlU3luYy5qcyJdLCJuYW1lcyI6WyJyZWR1Y2VTeW5jIiwiYXJyYXkiLCJmbiIsImluaXRpYWxWYWx1ZSIsImNiIiwicmVzdWx0IiwibGVuZ3RoIiwiVHlwZUVycm9yIiwiaWR4IiwiYWNjIiwiZXJyIiwiY29uc29sZSIsImVycm9yIiwid2luZG93Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQSxJQUFNQSxVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFDQyxLQUFELEVBQVFDLEVBQVIsRUFBWUMsWUFBWixFQUEwQkMsRUFBMUIsRUFBaUM7QUFDbEQ7QUFDQTtBQUNBO0FBQ0EsTUFBSTtBQUNGLFFBQUlDLE1BQUosQ0FERSxDQUdGOztBQUNBLFFBQUlKLEtBQUssQ0FBQ0ssTUFBTixLQUFpQixDQUFqQixJQUFzQixDQUFDSCxZQUEzQixFQUF5QyxNQUFNLElBQUlJLFNBQUosQ0FBYyw4REFBZCxDQUFOLENBQXpDLEtBQ0ssSUFBSU4sS0FBSyxDQUFDSyxNQUFOLEtBQWlCLENBQWpCLElBQXNCSCxZQUExQixFQUF3Q0UsTUFBTSxHQUFHRixZQUFULENBQXhDLEtBQ0EsSUFBSUYsS0FBSyxDQUFDSyxNQUFOLEtBQWlCLENBQWpCLElBQXNCLENBQUNILFlBQTNCLEVBQXlDRSxNQUFNLEdBQUdKLEtBQUssQ0FBQyxDQUFELENBQWQsQ0FBekMsS0FDQTtBQUNIO0FBQ0EsVUFBSU8sR0FBRyxHQUFHLENBQVY7QUFDQSxVQUFJQyxHQUFKLENBSEcsQ0FLSDs7QUFDQSxVQUFJTixZQUFKLEVBQWtCO0FBQ2hCTSxXQUFHLEdBQUdOLFlBQU47QUFDRCxPQUZELE1BR0s7QUFDSE0sV0FBRyxHQUFHUixLQUFLLENBQUNPLEdBQUQsQ0FBWDtBQUNBQSxXQUFHO0FBQ0osT0FaRSxDQWNIOzs7QUFDQSxhQUFPQSxHQUFHLEdBQUdQLEtBQUssQ0FBQ0ssTUFBbkIsRUFBMkI7QUFDekJHLFdBQUcsR0FBR1AsRUFBRSxDQUFDTyxHQUFELEVBQU1SLEtBQUssQ0FBQ08sR0FBRCxDQUFYLEVBQWtCQSxHQUFsQixFQUF1QlAsS0FBdkIsQ0FBUjtBQUNBTyxXQUFHO0FBQ0o7O0FBQ0RILFlBQU0sR0FBR0ksR0FBVDtBQUNEO0FBRURMLE1BQUUsQ0FBQ0MsTUFBRCxDQUFGO0FBQ0EsV0FBT0EsTUFBUDtBQUNELEdBL0JELENBZ0NBLE9BQU1LLEdBQU4sRUFBVztBQUNUQyxXQUFPLENBQUNDLEtBQVIsQ0FBY0YsR0FBZDtBQUNEO0FBQ0YsQ0F2Q0QsQyxDQXlDQTs7O0FBQ0FHLE1BQU0sQ0FBQ2IsVUFBUCxHQUFvQkEsVUFBcEIsQyIsImZpbGUiOiJyZWR1Y2VTeW5jLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9qcy9yZWR1Y2VTeW5jLmpzXCIpO1xuIiwiLy8g0KHQuNC90YXRgNC+0L3QvdCw0Y8g0YQt0YbQuNGPIHJlZHVjZVxuY29uc3QgcmVkdWNlU3luYyA9IChhcnJheSwgZm4sIGluaXRpYWxWYWx1ZSwgY2IpID0+IHtcbiAgLy8g0J7QsdC+0YDQsNGH0LjQstCw0LXQvCDQstGB0Y4g0LvQvtCz0LjQutGDINCyIHRyeS4uY2F0Y2hcbiAgLy8g0KfRgtC+0LHRiyDQu9C+0LLQuNGC0Ywg0L7RiNC40LHQutC4LCDQstGL0LLQvtC00Y8g0YHQvtC+0LHRidC10L3QuNC1INCyINC60L7QvdGB0L7Qu9GMLFxuICAvLyDQvdC+INC90LUg0YDRg9GI0LAg0LTQsNC70YzQvdC10LnRiNC10LUg0LLRi9C/0L7Qu9C90LXQvdC40LUg0YHQutGA0LjQv9GC0L7QslxuICB0cnkge1xuICAgIGxldCByZXN1bHQ7XG5cbiAgICAvLyDQntCx0YDQsNCx0LDRgtGL0LLQsNC10Lwg0LrQsNGA0LXQstGL0LUg0YHQu9GD0YfQsNC4LCDRh9GC0L7QsdGLINC70LjRiNC90LjQuSDRgNCw0Lcg0L3QtSDQs9C+0L3Rj9GC0Ywg0YbQuNC60LtcbiAgICBpZiAoYXJyYXkubGVuZ3RoID09PSAwICYmICFpbml0aWFsVmFsdWUpIHRocm93IG5ldyBUeXBlRXJyb3IoJ9Ce0YjQuNCx0LrQsCwg0L/QtdGA0LXQtNCw0L0g0L/Rg9GB0YLQvtC5INC80LDRgdGB0LjQsiDQuCDQvdC1INC30LDQtNCw0L3QviDQvdCw0YfQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtScpO1xuICAgIGVsc2UgaWYgKGFycmF5Lmxlbmd0aCA9PT0gMCAmJiBpbml0aWFsVmFsdWUpIHJlc3VsdCA9IGluaXRpYWxWYWx1ZTtcbiAgICBlbHNlIGlmIChhcnJheS5sZW5ndGggPT09IDEgJiYgIWluaXRpYWxWYWx1ZSkgcmVzdWx0ID0gYXJyYXlbMF07XG4gICAgZWxzZSB7XG4gICAgICAvLyDQntGB0L3QvtCy0L3QsNGPINC70L7Qs9C40LrQsFxuICAgICAgbGV0IGlkeCA9IDA7XG4gICAgICBsZXQgYWNjO1xuXG4gICAgICAvLyDQntC/0YDQtdC00LXQu9GP0LXQvCDQvdCw0YfQsNC70YzQvdGL0LUg0LfQvdCw0YfQtdC90LjRj1xuICAgICAgaWYgKGluaXRpYWxWYWx1ZSkge1xuICAgICAgICBhY2MgPSBpbml0aWFsVmFsdWU7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYWNjID0gYXJyYXlbaWR4XTtcbiAgICAgICAgaWR4Kys7XG4gICAgICB9XG5cbiAgICAgIC8vINCX0LDQv9GD0YHQutCw0LXQvCDRhtC40LrQuyDQv9C+INC80LDRgdGB0LjQstGDXG4gICAgICB3aGlsZSAoaWR4IDwgYXJyYXkubGVuZ3RoKSB7XG4gICAgICAgIGFjYyA9IGZuKGFjYywgYXJyYXlbaWR4XSwgaWR4LCBhcnJheSk7XG4gICAgICAgIGlkeCsrO1xuICAgICAgfVxuICAgICAgcmVzdWx0ID0gYWNjO1xuICAgIH1cblxuICAgIGNiKHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBjYXRjaChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycik7XG4gIH1cbn07XG5cbi8vINCX0LDQv9C40YHRi9Cy0LDQtdC8INCyINCz0LvQvtCx0LDQu9GM0L3Rg9GOINC/0LXRgNC10LzQtdC90L3Rg9GOLCDQtNC70Y8g0LHRi9GB0YLRgNC+0LPQviDQtNC+0YHRgtGD0L8g0Log0YQt0YbQuNC4INC40LfQstC90LVcbndpbmRvdy5yZWR1Y2VTeW5jID0gcmVkdWNlU3luYztcbiJdLCJzb3VyY2VSb290IjoiIn0=