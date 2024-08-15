import {sentData} from './api.js';
import {addStylePicture, onChangeSliderEffect, onDecreaseImage, onIncreaseImage, imageEffects, sliderElement, effectsList, previewPhoto, scaleControlValue} from './photo-process-form.js';
const HASHTAG_LENGTH_MAX = 20;
const HASHTAG_LENGTH_MIN = 2;
const formImgUpload = document.querySelector('.img-upload__form');
const imgUploadOverlay = formImgUpload.querySelector('.img-upload__overlay');
const inputImgUpload = formImgUpload.querySelector('.img-upload__input');
const buttonUploadCancel = formImgUpload.querySelector('.img-upload__cancel');
const inputHashtags = document.querySelector('.text__hashtags');
const textareaDescription = document.querySelector('.text__description');
const buttonScaleControlSmaller = document.querySelector('.scale__control--smaller');
const buttonScaleControlBigger = document.querySelector('.scale__control--bigger');
const valueElement = document.querySelector('.effect-level__value');
const buttonUploadSubmit = formImgUpload.querySelector('.img-upload__submit');

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
const splitHashtags = (str) => str
  .trim()
  .split(' ')
  .filter((hashtag) => hashtag.length > 0);

/**
  * Функция для проверки длины введённого значения в поле хэштегов
  * @param {string} value -атрибут поля ввода
  * @returns {boolean} - true, меньше или равна 20
  */
const validateHashtagsLengthMax = (value) => splitHashtags(value).every((tag) => tag.length <= HASHTAG_LENGTH_MAX);

/**
  * Функция для проверки длины введённого значения в поле хэштегов
  * @param {string} value -атрибут поля ввода
  * @returns {boolean} - true, если длина строки больше или равна 2
  */
const validateHashtagsLengthMin = (value) => splitHashtags(value).every((tag) => tag.length >= HASHTAG_LENGTH_MIN);

/**
  * Функция для проверки первого символа хэштега
  * @param {string} value -атрибут поля ввода
  * @returns {boolean} - true, если хэштег начинается с символа # (решётка)
  */
const checkFirstCharacter = (value) => splitHashtags(value).every((tag) => tag[0] === '#');

/**
  * Функция для проверки соответствия хэштега шаблону
  * @param {string} value -атрибут поля ввода
  * @returns {boolean} - true, если хэштег соответствует шаблону
  */
const validateHashtag = (value) => {
  const sampleHashtag = /^#[a-zа-яё0-9]{1,19}$/i;
  return splitHashtags(value).every((tag) => sampleHashtag.test(tag));
};

/**
  * Функция для проверки количества хэштегов
  * @param {string} value -атрибут поля ввода
  * @returns {boolean} - true, если количества хэштегов не более 5
  */
const checkNumberHashtags = (value) => splitHashtags(value).length <= 5;

/**
  * Функция для проверки уникальности хэштегов
  * @param {string} value -атрибут поля ввода
  * @returns {boolean} - true, если все хэштегои уникальны
  */
const checkUniquenessHashtags = (value) => {
  const str = splitHashtags(value).map((elem) => elem.toLowerCase());
  return str.length === new Set(str).size;
};

/**
 * Функция добавления валидатора на форму
 */
const addValidatorToForm = () => {
  pristine.addValidator(formImgUpload.querySelector('.text__hashtags'), validateHashtagsLengthMax, 'Максимальная длина одного хэштега должна быть не более 20 символов, включая решётку');

  pristine.addValidator(formImgUpload.querySelector('.text__hashtags'), validateHashtagsLengthMin, 'Минимальная длина одного хэштега должна быть не меньше 2 символов, включая решётку');

  pristine.addValidator(formImgUpload.querySelector('.text__hashtags'), checkFirstCharacter, 'Хэштег должен начинаться с символа # (решётка)');

  pristine.addValidator(formImgUpload.querySelector('.text__hashtags'), validateHashtag, 'Строка не соответсвтует шаблону: должны быть первый символ #, далее цифры и буквы');

  pristine.addValidator(formImgUpload.querySelector('.text__hashtags'), checkNumberHashtags, 'Нельзя указать больше пяти хэштегов');

  pristine.addValidator(formImgUpload.querySelector('.text__hashtags'), checkUniquenessHashtags, 'Один и тот же хэштег не может быть использован дважды');
};


/**
 * Функция закрытия полномерного изображения по нажатию клавиши Esc
 */
const onCloseKeydown = (evt) => {
  if (evt.key === 'Escape') {
    if (evt.target !== inputHashtags && evt.target !== textareaDescription) {
      evt.preventDefault();
      imgUploadOverlay.classList.add('hidden');
      buttonUploadSubmit.disabled = false;
      inputImgUpload.value = '';
      sliderElement.noUiSlider.set(0);
      scaleControlValue.setAttribute('value', '100%');
      previewPhoto.style.transform = 'scale(1)';
      document.querySelector('.effects__radio').checked = true;
    }
  }
};

/**
* Функция закрытия полномерного изображения
*/
const onCloseForm = () => {
  buttonUploadSubmit.disabled = false;
  formImgUpload.reset();
  pristine.reset();
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onCloseKeydown);
  sliderElement.noUiSlider.set(0);
  scaleControlValue.setAttribute('value', '100%');
  previewPhoto.style.transform = 'scale(1)';
  document.querySelector('.effects__radio').checked = true;
  imgUploadOverlay.classList.add('hidden');
};

/**
 * Функция отрытия полномерного изображения
 */
const onOpenFullSizeImage = () => {
  imgUploadOverlay.classList.remove('hidden');
  previewPhoto.src = URL.createObjectURL(inputImgUpload.files[0]);
  formImgUpload.querySelectorAll('.effects__preview').forEach((preview) => {
    preview.style.backgroundImage = `url(${previewPhoto.src})`;
  });
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onCloseKeydown);
  sliderElement.classList.add('hidden');
  buttonUploadCancel.addEventListener('click', onCloseForm);
};


/**
 * Функция добавления обработчиков событий на форму
 */
const addHandlersToForm = () => {
  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
    addStylePicture(sliderElement.noUiSlider.get(), imageEffects);
  });
  effectsList.addEventListener('change', onChangeSliderEffect);

  buttonScaleControlSmaller.addEventListener('click', onDecreaseImage);
  buttonScaleControlBigger.addEventListener('click', onIncreaseImage);

  addValidatorToForm();

  formImgUpload.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      sentData(formData, onCloseForm);
    }
  });
  inputImgUpload.addEventListener('change', onOpenFullSizeImage);
};

export {addHandlersToForm, onCloseKeydown};
