const formImgUpload = document.querySelector('.img-upload__form');
const imgUploadOverlay = formImgUpload.querySelector('.img-upload__overlay');
const inputImgUpload = formImgUpload.querySelector('.img-upload__input');
const buttonUploadCancel = formImgUpload.querySelector('.img-upload__cancel');
const previewPhoto = document.querySelector('.img-upload__preview img');
const inputHashtags = document.querySelector('.text__hashtags');
const textareaDescription = document.querySelector('.text__description');

const pristine = new Pristine(formImgUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

formImgUpload.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});

/**
 * Функция отрытия полномерного изображения
 */
inputImgUpload.addEventListener('change', () => {
  previewPhoto.src = URL.createObjectURL(inputImgUpload.files[0]);
  imgUploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
});


/**
* Функция валидации хэштегов
*/
function validateHashtags(evt) {
  const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
  if (hashtag.test(evt.target.value)) {
    console.log(hashtag.test('#gg'));
    console.log(evt.target.value);
  }
}
inputHashtags.addEventListener('input', validateHashtags);

/**
* Функция валидации textarea
*/
function validateTextarea() {

}
textareaDescription.addEventListener('input', validateTextarea);

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
    // console.log(evt.target);
    if (evt.target !== inputHashtags && evt.target !== textareaDescription) {
      evt.preventDefault();
      imgUploadOverlay.classList.add('hidden');
      inputImgUpload.value = '';
    }
  }
});
