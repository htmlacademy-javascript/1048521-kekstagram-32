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

function showError(message) {
  const templateShowErrorElement = document.querySelector('#data-error').content.querySelector('.data-error');
  const titleElement = templateShowErrorElement.querySelector('.data-error__title');

  titleElement.textContent = message;
  document.body.append(templateShowErrorElement);

  setTimeout(() => {
    templateShowErrorElement.remove();
  }, ALERT_SHOW_TIME);
}

function showSuccess(message) {
  const templateShowSuccessElement = document.querySelector('#success').content.querySelector('.success__inner');
  const titleElement = templateShowSuccessElement.querySelector('.success__title');
  const buttonElement = templateShowSuccessElement.querySelector('.success__button');

  titleElement.textContent = message;
  document.body.append(templateShowSuccessElement);

  buttonElement.addEventListener('click', () => {
    templateShowSuccessElement.remove();
  });
}


export {showSuccess, showError, getRandomInteger, getElementFromArray};
