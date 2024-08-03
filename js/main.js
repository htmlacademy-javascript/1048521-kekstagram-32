import {drawingPhotos} from './miniatures.js';
import {addHandlersToForm} from './form.js';

addHandlersToForm();

fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    drawingPhotos(photos);
  });
