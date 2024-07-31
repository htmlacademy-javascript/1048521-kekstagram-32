const HASHTAG_LENGTH_MAX = 20;
const HASHTAG_LENGTH_MIN = 2;
const IMAGE_ZOOM_STEP = 25;
const MAXIMUM_IMAGE_MAGNIFICATION = 100;
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
const sliderElement = document.querySelector('.img-upload__effect-level');
const valueElement = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

/**
 * Функция для добавления стиля картинке
 * @param {number} v - данные полля ввода
 */
function addStylePicture(number) {
  const inputChecked = effectsList.querySelector('input:checked');
  if (inputChecked.id === 'effect-none') {
    previewPhoto.style.filter = 'none';
  } else if (inputChecked.id === 'effect-chrome') {
    previewPhoto.style.filter = `grayscale(${number})`;

  } else if (inputChecked.id === 'effect-sepia') {
    previewPhoto.style.filter = `sepia(${number})`;

  } else if (inputChecked.id === 'effect-marvin') {
    previewPhoto.style.filter = `invert(${number}%)`;

  } else if (inputChecked.id === 'effect-phobos') {
    previewPhoto.style.filter = `blur(${number}px)`;

  } else if (inputChecked.id === 'effect-heat') {
    previewPhoto.style.filter = `brightness(${number})`;
  }
}

function changeSliderEffect(evt) {
  if (evt.target.id === 'effect-none') {
    sliderElement.classList.add('hidden');
    sliderElement.noUiSlider.set(0);
  } else if (evt.target.id === 'effect-chrome') {
    sliderElement.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  } else if (evt.target.id === 'effect-sepia') {
    sliderElement.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  } else if (evt.target.id === 'effect-marvin') {
    sliderElement.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
  } else if (evt.target.id === 'effect-phobos') {
    sliderElement.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  } else if (evt.target.id === 'effect-heat') {
    sliderElement.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }
}

/**
 * Функция уменьшения масштаба загруженной картинки
 */
function handlerDecreaseImage() {
  const valueSlice = +scaleControlValue.value.slice(0, -1);
  if (valueSlice > IMAGE_ZOOM_STEP) {
    scaleControlValue.value = `${valueSlice - IMAGE_ZOOM_STEP}%`;
    previewPhoto.style.transform = `scale(${(valueSlice - IMAGE_ZOOM_STEP) / 100})`;
  }
}

/**
 * Функция увеличения масштаба загруженной картинки
 */
function handlerIncreaseImage() {
  const valueSlice = +scaleControlValue.value.slice(0, -1);
  if (valueSlice <= (MAXIMUM_IMAGE_MAGNIFICATION - IMAGE_ZOOM_STEP)) {
    scaleControlValue.value = `${+valueSlice + IMAGE_ZOOM_STEP}%`;
    previewPhoto.style.transform = `scale(${(valueSlice + IMAGE_ZOOM_STEP) / 100})`;
  }
  if (valueSlice > (MAXIMUM_IMAGE_MAGNIFICATION - IMAGE_ZOOM_STEP)) {
    previewPhoto.style.transform = 'scale(1)';
  }
}

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
function validateHashtagsLengthMax(value) {
  return splitHashtags(value).every((tag) => tag.length <= HASHTAG_LENGTH_MAX);
}

/**
  * Функция для проверки длины введённого значения в поле хэштегов
  * @param {string} value -атрибут поля ввода
  * @returns {boolean} - true, если длина строки больше или равна 2
  */
function validateHashtagsLengthMin(value) {
  return splitHashtags(value).every((tag) => tag.length >= HASHTAG_LENGTH_MIN);
}

/**
  * Функция для проверки первого символа хэштега
  * @param {string} value -атрибут поля ввода
  * @returns {boolean} - true, если хэштег начинается с символа # (решётка)
  */
function checkFirstCharacter (value) {
  return splitHashtags(value).every((tag) => tag[0] === '#');
}

/**
  * Функция для проверки соответствия хэштега шаблону
  * @param {string} value -атрибут поля ввода
  * @returns {boolean} - true, если хэштег соответствует шаблону
  */
function validateHashtag (value) {
  const sampleHashtag = /^#[a-zа-яё0-9]{1,19}$/i;
  return splitHashtags(value).every((tag) => sampleHashtag.test(tag));
}

/**
  * Функция для проверки количества хэштегов
  * @param {string} value -атрибут поля ввода
  * @returns {boolean} - true, если количества хэштегов не более 5
  */
function checkNumberHashtags (value) {
  return splitHashtags(value).length <= 5;
}

/**
  * Функция для проверки уникальности хэштегов
  * @param {string} value -атрибут поля ввода
  * @returns {boolean} - true, если все хэштегои уникальны
  */
function checkUniquenessHashtags (value) {
  const str = splitHashtags(value).map((elem) => elem.toLowerCase());
  return str.length === new Set(str).size;
}

function addValidatorToForm() {
  pristine.addValidator(formImgUpload.querySelector('.text__hashtags'), validateHashtagsLengthMax, 'Максимальная длина одного хэштега должна быть не более 20 символов, включая решётку');

  pristine.addValidator(formImgUpload.querySelector('.text__hashtags'), validateHashtagsLengthMin, 'Минимальная длина одного хэштега должна быть не меньше 2 символов, включая решётку');

  pristine.addValidator(formImgUpload.querySelector('.text__hashtags'), checkFirstCharacter, 'Хэштег должен начинаться с символа # (решётка)');

  pristine.addValidator(formImgUpload.querySelector('.text__hashtags'), validateHashtag, 'Строка не соответсвтует шаблону: должны быть первый символ #, далее цифры и буквы');

  pristine.addValidator(formImgUpload.querySelector('.text__hashtags'), checkNumberHashtags, 'Нельзя указать больше пяти хэштегов');

  pristine.addValidator(formImgUpload.querySelector('.text__hashtags'), checkUniquenessHashtags, 'Один и тот же хэштег не может быть использован дважды');
}

/**
 * Функция отрытия полномерного изображения
 */
function openFullSizeImage() {
  previewPhoto.src = URL.createObjectURL(inputImgUpload.files[0]);
  imgUploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onCloseKeydown);
  sliderElement.classList.add('hidden');
}

/**
* Функция закрытия полномерного изображения
*/
function onCloseForm() {
  formImgUpload.reset();
  pristine.reset();
  imgUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onCloseKeydown);
  sliderElement.noUiSlider.set(0);
  scaleControlValue.value = '100%';
  previewPhoto.style.transform = 'scale(1)';
  document.querySelector('.effects__radio').checked = true;
}

/**
 * Функция закрытия полномерного изображения по нажатию клавиши Esc
 */
function onCloseKeydown(evt) {
  if (evt.key === 'Escape') {
    if (evt.target !== inputHashtags && evt.target !== textareaDescription) {
      evt.preventDefault();
      imgUploadOverlay.classList.add('hidden');
      inputImgUpload.value = '';
      sliderElement.noUiSlider.set(0);
      scaleControlValue.value = '100%';
      previewPhoto.style.transform = 'scale(1)';
      document.querySelector('.effects__radio').checked = true;
    }
  }
}


function addHandlersToForm() {
  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
    addStylePicture(sliderElement.noUiSlider.get());
  });
  effectsList.addEventListener('click', (evt) => {
    changeSliderEffect(evt);
  });

  buttonScaleControlSmaller.addEventListener('click', handlerDecreaseImage);
  buttonScaleControlBigger.addEventListener('click', handlerIncreaseImage);

  addValidatorToForm();

  formImgUpload.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
  inputImgUpload.addEventListener('change', openFullSizeImage);
  buttonUploadCancel.addEventListener('click', onCloseForm);
}

export {addHandlersToForm};
