import {debounce} from './util.js';
const COUNT_RENDERED_PHOTOS = 25;
const RERENDER_DELAY = 500;
const boxFiltersForm = document.querySelector('.img-filters__form');
const buttonsFiltersForm = boxFiltersForm.querySelectorAll('.img-filters__button');
const filterDefault = document.querySelector('#filter-default');
const filterDiscussed = document.querySelector('#filter-discussed');
const filterRandom = document.querySelector('#filter-random');
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
  return photosRandom.slice(0, 10);
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
  boxFiltersForm.addEventListener('click', debounce((evt) => {
    buttonsFiltersForm.forEach((button) => {
      button.classList.remove('img-filters__button--active');
    });
    if (evt.target.id === 'filter-default') {
      filterDefault.classList.add('img-filters__button--active');
      cb(photos.slice(0, COUNT_RENDERED_PHOTOS));
    } else if (evt.target.id === 'filter-discussed') {
      filterDiscussed.classList.add('img-filters__button--active');
      cb(photos.slice().sort(comparePhotos));
    } else if (evt.target.id === 'filter-random') {
      filterRandom.classList.add('img-filters__button--active');
      cb(getRandomPhotos(photos));
    }
  }, RERENDER_DELAY));
};

export {setClick};