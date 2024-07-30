import {generatePhotos} from './data.js';
import {drawingPhotos} from './miniatures.js';
import {editImageForm} from './form.js';

const photosData = generatePhotos(25);

drawingPhotos(photosData);
editImageForm();
