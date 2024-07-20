const bigPicture = document.querySelector('.big-picture');
const buttonBigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const srcBigPhoto = bigPicture.querySelector('.big-picture__img').querySelector('img');
const socialCaption = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialCommentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const socialComments = document.querySelector('.social__comments');
const socialCommentsLoader = bigPicture.querySelector('.social__comments-loader');

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
  if (comments.length === 0) {
    bigPicture.querySelector('.social__comment-count').innerHTML = '<span class="social__comment-shown-count">0 комментариев</span>';
  }

  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  let count = 0;
  socialComments.innerHTML = '';

  function uploadPhotos() {
    for (let i = 0; i < 5; i++) {
      if (count < comments.length) {
        socialComments.insertAdjacentHTML('beforeend', `<li class="social__comment">
            <img
              class='social__picture'
              src= ${comments[count].avatar}
              alt= ${comments[count].name}
              width='35' height='35'>
            <p class='social__text'>${comments[count].message}</p>
          </li>`);
        count++;
        if (count >= comments.length) {
          socialCommentsLoader.classList.add('hidden');
        }

      }
    }

    if(comments.length < 5) {
      socialCommentShownCount.textContent = comments.length;
    } else {
      socialCommentShownCount.textContent = count;
    }

  }
  uploadPhotos();
  socialCommentsLoader.addEventListener('click', uploadPhotos);
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
