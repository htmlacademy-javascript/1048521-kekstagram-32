import {getData} from './api.js';
import {addHandlersToForm} from './form.js';
import {drawingPhotos} from './miniatures.js';

addHandlersToForm();
getData(drawingPhotos);
