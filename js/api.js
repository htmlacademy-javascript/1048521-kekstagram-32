import {showErrorData, showSuccess, showErrorForm} from './util.js';
import {setClick} from './photo-filters.js';
import {drawPhotos} from './miniatures.js';
const BASE_URL_DATA = 'https://32.javascript.htmlacademy.pro/kekstagram/data';
const BASE_URL_FORM = 'https://32.javascript.htmlacademy.pro/kekstagram/';
let photosCollection = [];

/**
 * Функция запроса данных с сервера
 * @returns {array} - возвращает массив данных
 */
const getData = () => {
  const imgFilters = document.querySelector('.img-filters');
  fetch(BASE_URL_DATA)
    .then((response) => response.json())
    .then((photos) => {
      photosCollection = photos;
      drawPhotos(photosCollection);
      imgFilters.classList.remove('img-filters--inactive');
      setClick(photosCollection, drawPhotos);
    })
    .catch(() => {
      showErrorData('Не удалось загрузить данные');
    });
};

/**
 * Функция отправки данных из формы на сервер
 */
const sendData = (formData, closeForm) => {
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

export {getData, sendData};
