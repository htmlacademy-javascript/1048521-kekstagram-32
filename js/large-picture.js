const bigPicture = document.querySelector('.big-picture');
const buttonBigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const srcBigPhoto = bigPicture.querySelector('.big-picture__img').querySelector('img');
const socialCaption = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialCommentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const socialComments = document.querySelector('.social__comments');
const socialCommentsLoader = bigPicture.querySelector('.social__comments-loader');
const socialCommentForCopy = socialComments.querySelector('.social__comment');
const NUMBER_COMMENTS = 5;
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
    const commentElement = socialCommentForCopy.cloneNode(true);
    const picture = commentElement.querySelector('.social__picture');
    commentElement.querySelector('.social__text').textContent = comment.message;
    socialComments.appendChild(commentElement);
    picture.src = comment.avatar;
    picture.alt = comment.name;

  });
  // обновляем счетчик комментариев
  currentIndex += commentsToShow.length;
  // обновляем количество отображенных комментариев
  socialCommentShownCount.textContent = currentIndex;
  if (currentIndex >= comments.length) {
    socialCommentShownCount.textContent = comments.length;
    socialCommentsLoader.classList.add('hidden');
  } else {
    socialCommentsLoader.classList.remove('hidden');
  }
};

/**
 * Функция загрузки дополнительных комментариев к фотографии
 */
const loadComments = () => {
  displayMessagesForPhoto(displayedComments);
};

/**
 * Функция создания и отрисовка полномерного изображения
 * @param {object} - данные изображения
 */
const renderFullSizeImage = ({url, likes, comments, description}) => {
  srcBigPhoto.src = url;
  socialCaption.textContent = description;
  likesCount.textContent = likes;
  socialCommentTotalCount.textContent = comments.length;

  if (comments.length === 0) {
    bigPicture.querySelector('.social__comment-count').textContent = '0 комментариев';
    socialCommentsLoader.classList.add('hidden');
  }
  // сбрасываем счетчик
  currentIndex = 0;
  // создаем копию массива комментариев, чтобы избежать изменения текущего массива и не сбивать меня с толку
  displayedComments = comments.slice();
  // почистить коробочку с комментариями перед отрисовкой
  socialComments.innerHTML = '';
  // рисуем комментарии
  displayMessagesForPhoto(comments);
  // удаляем обработчик событий на каждой фотке, чтобы данные с предыдущей открытой фотки не влияли на текущую
  socialCommentsLoader.removeEventListener('click', loadComments);
  socialCommentsLoader.addEventListener('click', loadComments);

  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

/**
 * Функция закрытия полномерного изображения
 */
const onCloseLargePhoto = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  displayedComments = [];
  socialComments.innerHTML = '';
  currentIndex = 0;
  socialCommentsLoader.classList.remove('hidden');
};
buttonBigPictureCancel.addEventListener('click', onCloseLargePhoto);

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
