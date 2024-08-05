import {showErrorData, showSuccess, showErrorForm} from './util.js';
const COUNT_RENDERED_PHOTOS = 25;
const BASE_URL_DATA = 'https://32.javascript.htmlacademy.pro/kekstagram/data';
const BASE_URL_FORM = 'https://32.javascript.htmlacademy.pro/kekstagram';

/**
 * Функция запроса данных с сервера
 * @returns {array} - возвращает массив данных
 */
const getData = (reject) => {
  fetch(BASE_URL_DATA)
    .then((response) => response.json())
    .then((photos) => {
      reject(photos.slice(0, COUNT_RENDERED_PHOTOS));
    })
    .catch(() => {
      showErrorData('Не удалось загрузить данные');
    });
};

/**
 * Функция отправки данных из формы на сервер
 */
const sentData = (formData, closeForm) => {
  fetch(BASE_URL_FORM,
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        closeForm();
        showSuccess('Изображение успешно загружено');
      } else {
        showErrorForm('Ошибка загрузки файла');
      }
    });
};

export {getData, sentData};
