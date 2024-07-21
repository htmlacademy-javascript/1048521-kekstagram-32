const formImgUpload = document.querySelector('.img-upload__form');
const imgUploadOverlay = formImgUpload.querySelector('.img-upload__overlay');
const inputImgUpload = formImgUpload.querySelector('.img-upload__input');
const buttonUploadCancel = formImgUpload.querySelector('.img-upload__cancel');
const previewPhoto = document.querySelector('.img-upload__preview img');

/**
 * Функция отрытия полномерного изображения
 */
inputImgUpload.addEventListener('change', () => {
  previewPhoto.src = URL.createObjectURL(inputImgUpload.files[0]);
  imgUploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
});

/**
* Функция закрытия полномерного изображения
*/
function closeForm() {
  imgUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
}
buttonUploadCancel.addEventListener('click', closeForm);

/**
 * Функция закрытия полномерного изображения по нажатию клавиши Esc
 */
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    imgUploadOverlay.classList.add('hidden');
  }
});
