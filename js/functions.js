
/**
 * Функция для проверки длины строки
 * @param {string} string - строка для проверки
 * @param {number} maxLength - максимальная длина строки
 * @returns {boolean} - true, если длина строки меньше или равна maxLength
 */

function checkLengthString(string, maxLength) {

  if(typeof string !== 'string') {
    return false;
  }

  return string.length <= maxLength;
}

checkLengthString(55, 20);
checkLengthString('жжжжжжжж', 20);
checkLengthString('жжжжжжжжжжжжжжж', 18);
checkLengthString('жжжжжж', 10);


/**
 * Функция для проверки, является ли строка палиндромом
 * @param {string} string - строка для проверки
 * @returns {boolean} - true, если строка является палиндромом
 */

function checkStringPalindrome(string) {
  const str = string.replaceAll(' ', '').toLowerCase();
  return str === str.split('').reverse().join('');
}

checkStringPalindrome('топот');
checkStringPalindrome('ДовОд');
checkStringPalindrome('Кекс');
checkStringPalindrome('Арбуз у зубра');


/**
 * Функция для возврата целого положительного числа
 * @param {string} str - строка для обработки
 * @returns {number} - целое положительное число
 */

function returnsNumber(str) {
  let string = '';

  if(typeof str === 'number') {
    string = parseInt(Math.abs(str).toString().replace('.', ''), 10);
  }

  for(let i = 0; i <= str.length - 1; i++) {
    const pars = Number.isNaN(parseInt(str[i], 10));
    if (pars === false) {
      string += str[i];
    }
  }

  if(string === '') {
    return NaN;
  }

  return +string;
}

returnsNumber('2023 год'); // 2023
returnsNumber('ECMAScript 2022'); // 2022
returnsNumber('1 кефир, 0.5 батона'); // 105
returnsNumber('агент 007'); // 7
returnsNumber('а я томат'); // NaN
returnsNumber(2023); // 2023
returnsNumber(-1); // 1
returnsNumber(1.5); // 15
