
const arrMessages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const arrNames = ['Тимофей', 'Вера', 'Родион', 'Даниил', 'Михаил', 'Илья', 'Аделина', 'Арсений', 'Александра', 'Иван', 'Дарья', 'Роман', 'Александр', 'Ксения', 'Марк', 'Никита', 'Екатерина', 'София', 'Глеб', 'Кира'];

const arrDescriptionPhoto = ['Пляж у озера', 'Указатель', 'Вид на песчаный пляж', 'Девушка в купальнике', 'Рагу с веселым рисом', 'Черная машина', 'Клубника на тарелке', 'Клюквенный морс', 'Самолет над пляжем', 'Обувница', 'Тропинка к пляжу', 'Белая машина', 'Рыба с овощами', 'Кото-ролл', 'Космические домашние тапочки', 'Вид на горы из иллюминатора', 'Хор', 'Красная машина', 'Тапочки с подсветкой', 'Площадь с пальмами', 'Салат', 'Пляж на закате', 'Краб', 'Концерт', 'Переправа'];

/**
 * Функция по получению случайного числа из диапазона
 * @param {number} a - нижняя граница
 * @param {number} b - верхняя граница
 * @returns {number} result - случайный индекс элемента из массива
 */
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/**
 * Функция по поиску случайного элемента в переданном массиве
 * @param {object} elements - массив данных
 * @returns {string} element - элемент массива
 */
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function creatingListMessages() {
  return Array.from({length: getRandomInteger(0, 30)}, () => {
    const commentUser = {
      id: +String(Math.random()).replace(/^0+/, '').replace('.', ''),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getRandomArrayElement(arrMessages),
      name: getRandomArrayElement(arrNames),
    };
    return commentUser;
  });
}

/**
 * Функция для генерации случайного объекта
 * @param {object} [] - массив данных пользователя
 * @returns {object} [] - массив объектов
 */
function generateRandomObject(index) {
  return {
    id: index,
    url: `photos/${index}.jpg`,
    description: arrDescriptionPhoto[index - 1],
    likes: getRandomInteger(15, 200),
    comments: creatingListMessages(arrMessages),
  };
}

/**
 * Создание массива из 25 сгенерированных объектов
 * @param {number} 25 - количество выведенных объектов
 * @param {function} generateRandomObject - функция для генерации случайного объекта
 * @returns {object} arrayData - массив объектов
 */
const arrayData = Array.from({length: 25}, (_, index) => generateRandomObject(++index));

console.log(arrayData);
