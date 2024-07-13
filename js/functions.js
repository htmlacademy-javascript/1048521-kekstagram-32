
const NUMBER_MINUTES_HOUR = 60;

/**
 * Функция для проверки длины строки
 * @param {string} string - строка для проверки
 * @param {number} maxLength - максимальная длина строки
 * @returns {boolean} - true, если длина строки меньше или равна maxLength
 */
function checkLengthString(string, maxLength) {

  if (typeof string !== 'string') {
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

  if (typeof str === 'number') {
    string = parseInt(Math.abs(str).toString().replace('.', ''), 10);
  }

  for(let i = 0; i <= str.length - 1; i++) {
    const pars = Number.isNaN(parseInt(str[i], 10));
    if (pars === false) {
      string += str[i];
    }
  }

  if (string === '') {
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

/**
 * Функция рассчета времени встречи
 * @param {string} startTime - время начала рабочего дня
 * @param {string} endTime - время конца рабочего дня
 * @param {string} meetingStartTime - время старта встречи
 * @param {number} durationMeeting - продолжительность встречи в минутах
 * @returns {boolean} - возвращает true, если встреча не выходит за рамки рабочего  дня, и false, если выходит
 */
function calculateMeetingTime(startTime, endTime, meetingStartTime, durationMeeting) {
  const start = startTime.split(':', 2);
  const startWork = (start[0] * NUMBER_MINUTES_HOUR) + Number(start[1]);

  const end = endTime.split(':', 2);
  const endWork = (end[0] * NUMBER_MINUTES_HOUR) + Number(end[1]);

  const meeting = meetingStartTime.split(':', 2);
  const meetingWork = (meeting[0] * NUMBER_MINUTES_HOUR) + Number(meeting[1]);

  if ((startWork > meetingWork) || ((meetingWork + durationMeeting) > endWork)) {
    return false;
  }

  return true;
}

calculateMeetingTime('08:00', '17:30', '14:00', 90); // true
calculateMeetingTime('8:0', '10:0', '8:0', 120); // true
calculateMeetingTime('08:00', '14:30', '14:00', 90); // false
calculateMeetingTime('14:00', '17:30', '08:0', 90); // false
calculateMeetingTime('8:00', '17:30', '08:00', 900); // false
