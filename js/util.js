import {onCloseKeydown, buttonUploadSubmitElement} from './form.js';
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

/**
 * Функция показа сообщения в случае ошибки при загрузке данных с сервера
 * @param {string} message - данные изображения
 */
const showErrorData = (message) => {
  const templateShowErrorElement = document.querySelector('#data-error').content.querySelector('.data-error');
  const titleElement = templateShowErrorElement.querySelector('.data-error__title');

  titleElement.textContent = message;
  document.body.append(templateShowErrorElement);

  setTimeout(() => {
    templateShowErrorElement.remove();
  }, ALERT_SHOW_TIME);
};

/**
 * Функция показа сообщения в случае ошибки при загрузке данных с сервера
 * @param {string} message - данные изображения
 */
const showErrorForm = (message) => {
  const templateShowErrorElement = document.querySelector('#error').content.querySelector('.error');
  const errorElement = templateShowErrorElement.cloneNode(true);
  const titleElement = errorElement.querySelector('.error__title');
  titleElement.textContent = message;
  document.body.appendChild(errorElement);

  const buttonElement = errorElement.querySelector('.error__button');
  const hideErrorElement = () => {
    errorElement.classList.add('hidden');
    buttonUploadSubmitElement.disabled = false;
    document.body.removeChild(errorElement);
  };

  buttonElement.addEventListener('click', hideErrorElement);

  document.addEventListener('click', (evt) => {
    if (evt.target === errorElement) {
      hideErrorElement();
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      hideErrorElement();
      document.addEventListener('keydown', onCloseKeydown);
    }
  });
  document.removeEventListener('keydown', onCloseKeydown);
  errorElement.classList.remove('hidden');
};

/**
 * Функция показа сообщения об успешной отправке формы
 * @param {string} message - данные изображения
 */
const showSuccess = (message) => {
  const templateShowSuccessElement = document.querySelector('#success').content.querySelector('.success');

  const titleElement = templateShowSuccessElement.querySelector('.success__title');
  const buttonElement = templateShowSuccessElement.querySelector('.success__button');

  titleElement.textContent = message;
  document.body.append(templateShowSuccessElement);

  buttonElement.addEventListener('click', () => {
    templateShowSuccessElement.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      templateShowSuccessElement.remove();
    }
  });

  document.addEventListener('click', (evt) => {
    if (evt.target === templateShowSuccessElement) {
      templateShowSuccessElement.remove();
    }
  });
};

/**
 * Функция зажержки отрисовки
 * @param {function} callback - функция данных с сервера
 * @param {number} timeoutDelay - время отрисовки
 */
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {showSuccess, showErrorData, showErrorForm, getRandomInteger, getElementFromArray, debounce};
