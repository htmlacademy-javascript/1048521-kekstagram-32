import {renderFullSizeImage} from './large-picture.js';
const templateUserImageElement = document.querySelector('#picture').content.querySelector('.picture');
const containerWithPhotosElement = document.querySelector('.pictures');
const imgUpload = containerWithPhotosElement.querySelector('.img-upload');
/**
 * Функция отрисовки фотографий на странице
 * @param {object} data - данные изображения
 * @returns {array} - возвращает массив фотографий
 */
const drawingPhotos = (data) => {
  containerWithPhotosElement.innerHTML = '';
  const fragmentWithPhotosElement = document.createDocumentFragment();
  data.forEach(({url, likes, comments, description}) => {
    const photoElement = templateUserImageElement.cloneNode(true);
    const photoElementImg = photoElement.querySelector('.picture__img');
    photoElementImg.src = url;
    photoElementImg.alt = description;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      renderFullSizeImage({url, likes, comments, description});
    });
    containerWithPhotosElement.appendChild(imgUpload);
    fragmentWithPhotosElement.appendChild(photoElement);
  });
  containerWithPhotosElement.appendChild(fragmentWithPhotosElement);
};

export {drawingPhotos};
