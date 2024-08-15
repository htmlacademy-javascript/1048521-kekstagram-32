const IMAGE_ZOOM_STEP = 25;
const MAXIMUM_IMAGE_MAGNIFICATION = 100;
const sliderElement = document.querySelector('.img-upload__effect-level');
const effectsListElement = document.querySelector('.effects__list');
const previewPhotoElement = document.querySelector('.img-upload__preview img');
const scaleControlValueElement = document.querySelector('.scale__control--value');

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
    from:(value) => parseFloat(value),
  },
});

const imageEffects = {
  none: {
    view: 'none',
    part: '',
  },
  chrome: {
    view: 'grayscale',
    part: '',
    minSlider: 0,
    maxSlider: 1,
    startSlider: 1,
    stepSlider: 0.1,
  },
  sepia: {
    view: 'sepia',
    part: '',
    minSlider: 0,
    maxSlider: 1,
    startSlider: 1,
    stepSlider: 0.1,
  },
  marvin: {
    view: 'invert',
    part: '%',
    minSlider: 0,
    maxSlider: 100,
    startSlider: 100,
    stepSlider: 1,
  },
  phobos: {
    view: 'blur',
    part: 'px',
    minSlider: 0,
    maxSlider: 3,
    startSlider: 3,
    stepSlider: 0.1,
  },
  heat: {
    view: 'brightness',
    part: '',
    minSlider: 1,
    maxSlider: 3,
    startSlider: 3,
    stepSlider: 0.1,
  },
};

/**
 * Функция для добавления эффектов картинке
 * @param {number} filterValue - значение фильтра
 * @param {array} effects - массив эффектов
 */
const addStylePicture = (filterValue, effects) => {
  const inputChecked = effectsListElement.querySelector('input:checked');
  const effect = effects[inputChecked.value];
  if (effect.view === 'none') {
    previewPhotoElement.style.filter = 'none';
  } else {
    previewPhotoElement.style.filter = `${effect.view}(${filterValue}${effect.part})`;
  }
  previewPhotoElement.style.setProperty('--effect-filter', `${effect.view}(${filterValue}${effect.part})`);
};

/**
 * Функция добавления слайдера на каждый эффект картинки
 * @param {object} evt - данные изображения
 */
const onChangeSliderEffect = (evt) => {
  const effect = imageEffects[(evt.target.id.split('-'))[1]];
  if (effect.view === 'none') {
    sliderElement.noUiSlider.set(0);
    sliderElement.classList.add('hidden');
  } else {
    sliderElement.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: effect.minSlider,
        max: effect.maxSlider,
      },
      start: effect.startSlider,
      step: effect.stepSlider,
    });
  }
};


/**
 * Функция уменьшения масштаба загруженной картинки
 */
const onDecreaseImage = () => {
  const valueSlice = +scaleControlValueElement.value.slice(0, -1);
  if (valueSlice > IMAGE_ZOOM_STEP) {
    scaleControlValueElement.setAttribute('value', `${valueSlice - IMAGE_ZOOM_STEP}%`);
    previewPhotoElement.style.transform = `scale(${(valueSlice - IMAGE_ZOOM_STEP) / 100})`;
  }
};

/**
 * Функция увеличения масштаба загруженной картинки
 */
const onIncreaseImage = () => {
  const valueSlice = +scaleControlValueElement.value.slice(0, -1);
  if (valueSlice <= (MAXIMUM_IMAGE_MAGNIFICATION - IMAGE_ZOOM_STEP)) {
    scaleControlValueElement.setAttribute('value', `${+valueSlice + IMAGE_ZOOM_STEP}%`);
    previewPhotoElement.style.transform = `scale(${(valueSlice + IMAGE_ZOOM_STEP) / 100})`;
  }
  if (valueSlice > (MAXIMUM_IMAGE_MAGNIFICATION - IMAGE_ZOOM_STEP)) {
    previewPhotoElement.style.transform = 'scale(1)';
  }
};

export {addStylePicture, onChangeSliderEffect, onDecreaseImage, onIncreaseImage, imageEffects, sliderElement, effectsListElement, previewPhotoElement, scaleControlValueElement};
