const NUMBER_COMMENTS = 5;
const bigPictureElement = document.querySelector('.big-picture');
const buttonBigPictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');
const srcBigPhotoElement = bigPictureElement.querySelector('.big-picture__img').querySelector('img');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const socialCommentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const socialCommentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const socialCommentsElement = document.querySelector('.social__comments');
const socialCommentsLoaderElement = bigPictureElement.querySelector('.social__comments-loader');
const socialCommentForCopyElement = socialCommentsElement.querySelector('.social__comment');
let currentIndex = 0; // счетчик комментариев
let displayedComments = []; // комментарии которые отображаются

/**
 * Функция загрузки комментариев к фотографии
 * @returns {array} - возвращает список комментариев к фотографии
 */
const displayMessagesForPhoto = (comments) => {
  // получае часть массива больщой фотки для отображения
  const commentsToShow = comments.slice(currentIndex, currentIndex + NUMBER_COMMENTS);
  // проходим по массиву комментариев, которые нужно отобразить
  commentsToShow.forEach((comment) => {
    const commentElement = socialCommentForCopyElement.cloneNode(true);
    const picture = commentElement.querySelector('.social__picture');
    commentElement.querySelector('.social__text').textContent = comment.message;
    socialCommentsElement.appendChild(commentElement);
    picture.src = comment.avatar;
    picture.alt = comment.name;

  });
  // обновляем счетчик комментариев
  currentIndex += commentsToShow.length;
  // обновляем количество отображенных комментариев
  socialCommentShownCountElement.textContent = currentIndex;
  if (currentIndex >= comments.length) {
    socialCommentShownCountElement.textContent = comments.length;
    socialCommentsLoaderElement.classList.add('hidden');
  } else {
    socialCommentsLoaderElement.classList.remove('hidden');
  }
};

/**
 * Функция загрузки дополнительных комментариев к фотографии
 */
const onloadComments = () => {
  displayMessagesForPhoto(displayedComments);
};

/**
 * Функция создания и отрисовка полномерного изображения
 * @param {object} - данные изображения
 */
const renderFullSizeImage = ({url, likes, comments, description}) => {
  srcBigPhotoElement.src = url;
  socialCaptionElement.textContent = description;
  likesCountElement.textContent = likes;
  socialCommentTotalCountElement.textContent = comments.length;

  if (comments.length === 0) {
    bigPictureElement.querySelector('.social__comment-count').textContent = '0 комментариев';
    socialCommentsLoaderElement.classList.add('hidden');
  }
  // сбрасываем счетчик
  currentIndex = 0;
  // создаем копию массива комментариев, чтобы избежать изменения текущего массива и не сбивать меня с толку
  displayedComments = comments.slice();
  // почистить коробочку с комментариями перед отрисовкой
  socialCommentsElement.innerHTML = '';
  // рисуем комментарии
  displayMessagesForPhoto(comments);
  // удаляем обработчик событий на каждой фотке, чтобы данные с предыдущей открытой фотки не влияли на текущую
  socialCommentsLoaderElement.removeEventListener('click', onloadComments);
  socialCommentsLoaderElement.addEventListener('click', onloadComments);

  bigPictureElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

/**
 * Функция закрытия полномерного изображения
 */
const onCloseLargePhoto = () => {
  bigPictureElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  displayedComments = [];
  socialCommentsElement.innerHTML = '';
  currentIndex = 0;
  socialCommentsLoaderElement.classList.remove('hidden');
};
buttonBigPictureCancelElement.addEventListener('click', onCloseLargePhoto);

/**
 * Функция закрытия полномерного изображения по нажатию клавиши Esc
 */
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    onCloseLargePhoto();
  }
});

export {renderFullSizeImage};
