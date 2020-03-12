// const lint = require('../src/js/reduce.js').default;
//
// const path = require('path');
// const fs = require('fs');
//
// const walkSync = (dir, filelist = []) => {
//   fs.readdirSync(dir).forEach((file) => {
//     filelist = fs.statSync(path.join(dir, file)).isDirectory()
//       ? walkSync(path.join(dir, file), filelist)
//       : filelist.concat(path.join(dir, file));
//   });
//
//   return filelist.filter((file) => /\.js$/.test(file));
// };
//
// const getRules = (files) => {
//   const modules = {};
//   files.forEach((fileName) => {
//     const fileContent = require(fileName);
//     modules[fileName] = modules[fileName] || [];
//     modules[fileName].push(fileContent);
//   });
//   return modules;
// };
//
// const warningRules = getRules(walkSync(path.join(__dirname, 'warningRules')));
// const titleRules = getRules(walkSync(path.join(__dirname, 'titleRules')));
// const gridRules = getRules(walkSync(path.join(__dirname, 'gridRules')));
//
// describe('\n########## Тестирование JSON-линтера ##########\n', () => {
//   describe('\n========== Правила линтинга блока warning ==========\n', () => {
//     for (const rule in warningRules) {
//       describe(`Проверка на ${rule}:`, () => {
//         warningRules[rule].forEach((rule) => {
//           it(rule.name, () => {
//             expect(lint(rule.json)).toStrictEqual(rule.answer);
//           });
//         });
//       });
//     }
//   });
//
//   describe('\n========== Правила линтинга заголовков на странице ==========\n', () => {
//     for (const rule in titleRules) {
//       describe(`Проверка на ${rule}:`, () => {
//         titleRules[rule].forEach((rule) => {
//           it(rule.name, () => {
//             expect(lint(rule.json)).toStrictEqual(rule.answer);
//           });
//         });
//       });
//     }
//   });
//
//   describe('\n========== Правила линтинга пропорции функциональных и рекламных блоков ==========\n', () => {
//     for (const rule in gridRules) {
//       describe(`Проверка на ${rule}:`, () => {
//         gridRules[rule].forEach((rule) => {
//           it(rule.name, () => {
//             expect(lint(rule.json)).toStrictEqual(rule.answer);
//           });
//         });
//       });
//     }
//   });
// });
