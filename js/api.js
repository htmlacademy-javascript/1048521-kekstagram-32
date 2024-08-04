import {showError, showSuccess} from './util.js';
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


/**
 * Функция отправки данных из формы на сервер
 */
const sentData = (formData, closeForm) => {
  fetch(
    'https://32.javascript.htmlacademy.pro/kekstagram',
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
        showError('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      showError('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sentData};
