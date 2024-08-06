import {showErrorData, showSuccess, showErrorForm, debounce} from './util.js';
import {setDefaultClick, setRandomClick, setDiscussedClick} from './photo-filters.js';
import {drawingPhotos} from './miniatures.js';
const BASE_URL_DATA = 'https://32.javascript.htmlacademy.pro/kekstagram/data';
const BASE_URL_FORM = 'https://32.javascript.htmlacademy.pro/kekstagram';
const RERENDER_DELAY = 500;
let photosSave = [];

/**
 * Функция запроса данных с сервера
 * @returns {array} - возвращает массив данных
 */
const getData = () => {
  const imgFilters = document.querySelector('.img-filters');
  fetch(BASE_URL_DATA)
    .then((response) => response.json())
    .then((photos) => {
      photosSave = photos;
      drawingPhotos(photosSave);
      imgFilters.classList.remove('img-filters--inactive');
      setDefaultClick(photosSave, drawingPhotos);
      setRandomClick(photos, drawingPhotos);
      setDiscussedClick(photos, drawingPhotos);
      // setDefaultClick(photosSave, debounce(() => drawingPhotos, RERENDER_DELAY));
      // setRandomClick(photos, debounce(() => drawingPhotos, RERENDER_DELAY));
      // setDiscussedClick(photos, debounce(() => drawingPhotos, RERENDER_DELAY));
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
