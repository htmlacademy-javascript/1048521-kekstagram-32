const bigPicture = document.querySelector('.big-picture');
const buttonBigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const srcBigPhoto = bigPicture.querySelector('.big-picture__img').querySelector('img');
const socialCaption = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialComments = document.querySelector('.social__comments');

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

  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  socialComments.innerHTML = '';
  comments.forEach((comment) => {
    socialComments.insertAdjacentHTML('beforeend', `<li class="social__comment">
      <img
        class='social__picture'
        src= ${comment.avatar}
        alt= ${comment.name}
        width='35' height='35'>
      <p class='social__text'>${comment.message}</p>
    </li>`);
  });

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
}

/**
 * Функция закрытия полномерного изображения
 */
function closeLargePhoto() {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
}
buttonBigPictureCancel.addEventListener('click', closeLargePhoto);

/**
 * Функция закрытия полномерного изображения по нажатию клавиши Esc
 */
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
});

export {renderFullSizeImage};
