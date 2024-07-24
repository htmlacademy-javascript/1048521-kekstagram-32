const formImgUpload = document.querySelector('.img-upload__form');
const imgUploadOverlay = formImgUpload.querySelector('.img-upload__overlay');
const inputImgUpload = formImgUpload.querySelector('.img-upload__input');
const buttonUploadCancel = formImgUpload.querySelector('.img-upload__cancel');
const previewPhoto = document.querySelector('.img-upload__preview img');
const inputHashtags = document.querySelector('.text__hashtags');
const textareaDescription = document.querySelector('.text__description');
const buttonScaleControlSmaller = document.querySelector('.scale__control--smaller');
const buttonScaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');

/**
 * Функция уменьшения масштаба загруженной картинки
 */
function reduceImage() {
  const valueSlice = +scaleControlValue.value.slice(0, -1);
  if (valueSlice > 25) {
    scaleControlValue.value = `${valueSlice - 25}%`;
    previewPhoto.style.transform = `scale(${(valueSlice - 25) / 100})`;
  }
}
buttonScaleControlSmaller.addEventListener('click', reduceImage);

/**
 * Функция увеличения масштаба загруженной картинки
 */
function increaseImage() {
  const valueSlice = +scaleControlValue.value.slice(0, -1);
  if (valueSlice <= 75) {
    scaleControlValue.value = `${+valueSlice + 25}%`;
    previewPhoto.style.transform = `scale(${(valueSlice + 25) / 100})`;
  }
  if (valueSlice > 75) {
    previewPhoto.style.transform = 'scale(1)';
  }
}
buttonScaleControlBigger.addEventListener('click', increaseImage);

const pristine = new Pristine(formImgUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

/**
 * Функция для разбивки строки на массив
 * @param {string} str - значение поле ввода
 * @returns {array} - массив из хэштегов
 */
const splitHashtagsArray = (str) => str
  .trim()
  .split(' ')
  .filter((s) => s.length > 0);

/**
 * Функция для проверки длины введённого значения в поле хэштегов
 * @param {string} value -атрибут поля ввода
 * @returns {boolean} - true, если длина строки больше или равна 2 и меньше или равна 20
 */
function validateHashtagsLength (value) {
  return splitHashtagsArray(value).every((tag) => tag.length <= 20);
}
pristine.addValidator(formImgUpload.querySelector('.text__hashtags'), validateHashtagsLength, 'Максимальная длина одного хэштега 20 символов, включая решётку');

/**
 * Функция для проверки первого символа хэштега
 * @param {string} value -атрибут поля ввода
 * @returns {boolean} - true, если хэштег начинается с символа # (решётка)
 */
function checkFirstCharacter (value) {
  return splitHashtagsArray(value).every((tag) => tag[0] === '#');
}
pristine.addValidator(formImgUpload.querySelector('.text__hashtags'), checkFirstCharacter, 'Хэштег начинается с символа # (решётка)');

/**
 * Функция для проверки соответствия хэштега шаблону
 * @param {string} value -атрибут поля ввода
 * @returns {boolean} - true, если хэштег соответствует шаблону
 */
function validateHashtag (value) {
  const sampleHashtag = /^#[a-zа-яё0-9]{1,19}$/i;
  return splitHashtagsArray(value).every((tag) => sampleHashtag.test(tag));
}
pristine.addValidator(formImgUpload.querySelector('.text__hashtags'), validateHashtag, 'Строка не соответсвтует шаблону');

/**
 * Функция для проверки количества хэштегов
 * @param {string} value -атрибут поля ввода
 * @returns {boolean} - true, если количества хэштегов не более 5
 */
function checkNumberHashtags (value) {
  return splitHashtagsArray(value).length <= 5;
}
pristine.addValidator(formImgUpload.querySelector('.text__hashtags'), checkNumberHashtags, 'Нельзя указать больше пяти хэштегов');

/**
 * Функция для проверки уникальности хэштегов
 * @param {string} value -атрибут поля ввода
 * @returns {boolean} - true, если все хэштегои уникальны
 */
function checkUniquenessHashtags (value) {
  const str = splitHashtagsArray(value).map((elem) => elem.toLowerCase());
  return str.length === new Set(str).size;
}
pristine.addValidator(formImgUpload.querySelector('.text__hashtags'), checkUniquenessHashtags, 'Один и тот же хэштег не может быть использован дважды');


formImgUpload.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

/**
 * Функция отрытия полномерного изображения
 */
inputImgUpload.addEventListener('change', () => {
  previewPhoto.src = URL.createObjectURL(inputImgUpload.files[0]);
  imgUploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onCloseKeydown);
});

/**
* Функция закрытия полномерного изображения
*/
function onCloseForm() {
  formImgUpload.reset();
  pristine.reset();
  imgUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onCloseKeydown);
}
buttonUploadCancel.addEventListener('click', onCloseForm);

/**
 * Функция закрытия полномерного изображения по нажатию клавиши Esc
 */
function onCloseKeydown(evt) {
  if (evt.key === 'Escape') {
    if (evt.target !== inputHashtags && evt.target !== textareaDescription) {
      evt.preventDefault();
      imgUploadOverlay.classList.add('hidden');
      inputImgUpload.value = '';
    }
  }
}
