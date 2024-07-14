import {generatePhotos} from './data.js';
import {drawingPhotos} from './miniatures.js';

const photosData = generatePhotos(25);

drawingPhotos(photosData);
