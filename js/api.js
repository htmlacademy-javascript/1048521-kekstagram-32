import {drawingPhotos} from './miniatures.js';
import {showError} from './util.js';
const COUNT_RENDERED_PHOTOS = 25;
const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram/data';

const getData = () => {
  fetch(BASE_URL)
    .then((response) => response.json())
    .then((photos) => {
      drawingPhotos(photos.slice(0, COUNT_RENDERED_PHOTOS));
    })
    .catch(() => {
      showError();
    });
};

export {getData};
