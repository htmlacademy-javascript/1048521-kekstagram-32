import {generatePhotos} from './data.js';
import {drawingPhotos} from './miniatures.js';
import './large-picture.js';

const photosData = generatePhotos(25);

drawingPhotos(photosData);
