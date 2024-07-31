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

/**
 * Функция загрузки комментариев к фотографии
 * @returns {array} - возвращает список комментариев к фотографии
 */
let currentIndex = 0;
const displayedComments = [];
function handlerCommentsPhoto(comments) {
  socialComments.innerHTML = '';
  const commentsToShow = comments.slice(currentIndex, currentIndex + NUMBER_COMMENTS);
  displayedComments.push(...commentsToShow);
  displayedComments.forEach((comment) => {
    const commentElement = socialCommentForCopy.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentElement.querySelector('.social__picture').alt = comment.name;
    socialComments.appendChild(commentElement);
  });
  currentIndex += commentsToShow.length;

  if (comments.length < NUMBER_COMMENTS) {
    socialCommentShownCount.textContent = comments.length;
  } else {
    socialCommentShownCount.textContent = currentIndex;
  }
  if (currentIndex === comments.length) {
    socialCommentsLoader.classList.add('hidden');
  }
}

/**
 * Функция создания и  открытия полномерного изображения
 * @param {object} - данные изображения
 * @returns {*} - возвращает отрисованую большую фотографию с комментариями
 */
function renderFullSizeImage({url, likes, comments, description}) {
  srcBigPhoto.src = url;
  socialCaption.textContent = description;
  likesCount.textContent = likes;
  socialCommentTotalCount.textContent = comments.length;
  if (comments.length <= NUMBER_COMMENTS) {
    socialCommentShownCount.textContent = comments.length;
    socialCommentsLoader.classList.add('hidden');
  }
  if (comments.length === 0) {
    bigPicture.querySelector('.social__comment-count').textContent = '0 комментариев';
    socialCommentsLoader.classList.add('hidden');
  }

  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  handlerCommentsPhoto(comments);

  socialCommentsLoader.addEventListener('click', () => {
    handlerCommentsPhoto(comments);
  });

}

/**
 * Функция закрытия полномерного изображения
 */
function closeLargePhoto() {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  socialCommentsLoader.removeEventListener('click', handlerCommentsPhoto);
}
buttonBigPictureCancel.addEventListener('click', closeLargePhoto);

/**
 * Функция закрытия полномерного изображения по нажатию клавиши Esc
 */
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    socialCommentsLoader.removeEventListener('click', handlerCommentsPhoto);
  }
});

export {renderFullSizeImage};
