const ALERT_SHOW_TIME = 5000;
/**
 * Функция по получению случайного числа из диапазона
 * @param {number} a - нижняя граница
 * @param {number} b - верхняя граница
 * @returns {number} result - случайный индекс элемента из массива
 */
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/**
 * Функция по поиску случайного элемента в переданном массиве
 * @param {Array}} elements - массив данных
 * @returns {*} element - элемент массива
 */
const getElementFromArray = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function showError() {
  const templateShowErrorElement = document.querySelector('#data-error').content.querySelector('.data-error');
  document.body.append(templateShowErrorElement);

  setTimeout(() => {
    templateShowErrorElement.remove();
  }, ALERT_SHOW_TIME);
}


export {showError, getRandomInteger, getElementFromArray};
