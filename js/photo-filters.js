import {debounce} from './util.js';
const COUNT_RENDERED_PHOTOS = 25;
const RERENDER_DELAY = 500;
const MAX_PHOTO_COUNT = 10;
const START_INDEX = 0;
const boxFiltersFormElement = document.querySelector('.img-filters__form');
const buttonsFiltersFormElements = boxFiltersFormElement.querySelectorAll('.img-filters__button');
const filterDefaultElement = document.querySelector('#filter-default');
const filterDiscussedElement = document.querySelector('#filter-discussed');
const filterRandomElement = document.querySelector('#filter-random');

/**
 * Функция извлекает количесвто комментариев каждой фотографии
 * @param {array} photos - массив объектов данных изображения
 * @returns {number} - возвращает количество комментариев каждой фотографии
 */
const getRankPhotos = (photos) => photos.comments.length;
/**
 * Функция сортировки данных в случайном порядке
 * @param {array} photos - массив объектов данных изображения
 * @returns {array} - возвращает отсортированный обрезанный массив данных изображения
 */
const getRandomPhotos = (photos) => {
  const photosRandom = photos.slice().sort(() => 0.5 - Math.random());
  return photosRandom.slice(START_INDEX, MAX_PHOTO_COUNT);
};
/**
 * Функция сортировки изображений по количеству комментариев
 * @param {number} photoA - количесвто комментариев в 1ом изображении
 * @param {number} photoB - количесвто комментариев во 2ом изображении
 * @returns {array} - возвращает осортированный по убыванию массив
 */
const comparePhotos = (photoA, photoB) => {
  const rankA = getRankPhotos(photoA);
  const rankB = getRankPhotos(photoB);
  return rankB - rankA;
};
/**
 * Функция для добавления события на клик
 * @param {object} photos - данные изображения
 * @param {function} cb - колбэк функция для отрисовки изображения
 */
const setClick = (photos, cb) => {
  boxFiltersFormElement.addEventListener('click', (evt) => {
    buttonsFiltersFormElements.forEach((button) => {
      button.classList.remove('img-filters__button--active');
    });
    if (evt.target.id === 'filter-default') {
      filterDefaultElement.classList.add('img-filters__button--active');
      debounce(() => cb(photos.slice(START_INDEX, COUNT_RENDERED_PHOTOS)), RERENDER_DELAY)();
    } else if (evt.target.id === 'filter-discussed') {
      filterDiscussedElement.classList.add('img-filters__button--active');
      debounce(() => cb(photos.slice().sort(comparePhotos)), RERENDER_DELAY)();
    } else if (evt.target.id === 'filter-random') {
      filterRandomElement.classList.add('img-filters__button--active');
      debounce(() => cb(getRandomPhotos(photos)), RERENDER_DELAY)();
    }
  });
};

export {setClick};
