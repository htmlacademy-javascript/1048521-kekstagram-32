import {generatePhotos} from './data.js';
import {drawingPhotos} from './miniatures.js';
import './form.js';

const photosData = generatePhotos(25);

drawingPhotos(photosData);
