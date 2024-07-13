import {generatePhotos} from './data.js';
const templateUserImage = document.querySelector('#picture').content;
const containerWithPhotos = document.querySelector('.pictures');
const fragmentWithPhotos = document.createDocumentFragment();
const arrayDataFromPhotos = generatePhotos(25);

arrayDataFromPhotos.forEach(({url, likes, comments}) => {
  const photoElement = templateUserImage.cloneNode(true);

  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.querySelector('.picture__likes').textContent = likes;

  fragmentWithPhotos.appendChild(photoElement);
});

containerWithPhotos.appendChild(fragmentWithPhotos);
