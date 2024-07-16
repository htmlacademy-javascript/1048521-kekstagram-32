const containerPictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const buttonBigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const srcBigPhoto = bigPicture.querySelector('.big-picture__img').querySelector('img');
const socialCaption = bigPicture.querySelector('.social__caption');
// const likesCount = bigPicture.querySelector('.likes-count');
// const socialCommentShownCount = bigPicture.querySelector('.social__comment-shown-count');

function renderFullSizeImage (evt) {
  if (evt.target.closest('.picture__img')) {
    // console.log(evt.target);
    srcBigPhoto.src = evt.target.src;
    socialCaption.textContent = evt.target.alt;
    // likesCount.textContent = evt.target.likes;
    bigPicture.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');

    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
  }
}
containerPictures.addEventListener('click', renderFullSizeImage);

function closeLargePhoto () {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
}
buttonBigPictureCancel.addEventListener('click', closeLargePhoto);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
});
