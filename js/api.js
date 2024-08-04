import {showError} from './util.js';
const COUNT_RENDERED_PHOTOS = 25;
const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram/data';

/**
 * Функция запроса данных с сервера
 * @returns {array} - возвращает массив данных
 */
const getData = (reject) => {
  fetch(BASE_URL)
    .then((response) => response.json())
    .then((photos) => {
      reject(photos.slice(0, COUNT_RENDERED_PHOTOS));
    })
    .catch(() => {
      showError('Не удалось загрузить данные');
    });
};

export {getData};
