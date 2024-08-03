import {drawingPhotos} from './miniatures.js';
import {addHandlersToForm} from './form.js';
const COUNT_RENDERED_PHOTOS = 25;

addHandlersToForm();

fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    console.log(photos);
    drawingPhotos(photos.slice(0, COUNT_RENDERED_PHOTOS));
  });
