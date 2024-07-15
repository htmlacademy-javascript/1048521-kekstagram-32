const containerPictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const buttonBigPictureCancel = document.querySelector('.big-picture__cancel');

function renderFullSizeImage (evt) {
  if (evt.target.closest('.picture__img')) {
    bigPicture.classList.remove('hidden');
  }
}
containerPictures.addEventListener('click', renderFullSizeImage);

function closeLargePhoto () {
  bigPicture.classList.add('hidden');
}
buttonBigPictureCancel.addEventListener('click', closeLargePhoto);
