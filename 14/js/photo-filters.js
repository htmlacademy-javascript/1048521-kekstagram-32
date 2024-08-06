const COUNT_RENDERED_PHOTOS = 25;
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
const setDefaultClick = (photos, cb) => {
  filterDefault.addEventListener('click', () => {
    filterDefault.classList.toggle('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    cb(photos.slice(0, COUNT_RENDERED_PHOTOS));
  });
};
/**
 * Функция для добавления события на клик
 * @param {object} photos - данные изображения
 * @param {function} cb - колбэк функция для отрисовки изображения
 */
const setRandomClick = (photos, cb) => {
  filterRandom.addEventListener('click', () => {
    filterRandom.classList.toggle('img-filters__button--active');
    filterDefault.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    cb(getRandomPhotos(photos));
  });
};
/**
 * Функция для добавления события на клик
 * @param {object} photos - данные изображения
 * @param {function} cb - колбэк функция для отрисовки изображения
 */
const setDiscussedClick = (photos, cb) => {
  filterDiscussed.addEventListener('click', () => {
    filterDiscussed.classList.toggle('img-filters__button--active');
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    cb(photos.slice().sort(comparePhotos));
  });
};
export {setDefaultClick, setRandomClick, setDiscussedClick};
