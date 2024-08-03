import {drawingPhotos} from './miniatures.js';
import {addHandlersToForm} from './form.js';

addHandlersToForm();


import {showError} from './util.js';
const COUNT_RENDERED_PHOTOS = 25;

fetch('https://32.javascript.htmlaademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    drawingPhotos(photos.slice(0, COUNT_RENDERED_PHOTOS));
  })
  .catch(() => {
    showError();
  });
