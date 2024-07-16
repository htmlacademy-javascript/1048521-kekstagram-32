const bigPicture = document.querySelector('.big-picture');
const buttonBigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const srcBigPhoto = bigPicture.querySelector('.big-picture__img').querySelector('img');
const socialCaption = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');

function renderFullSizeImage ({url, likes, comments, description}) {
  srcBigPhoto.src = url;
  socialCaption.textContent = description;
  likesCount.textContent = likes;
  socialCommentTotalCount.textContent = comments.length;

  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  // document.querySelector('.social__comment-count').classList.add('hidden');
  // document.querySelector('.comments-loader').classList.add('hidden');
}


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

export {renderFullSizeImage};
