
import {getRandomInteger, elementFromArray} from './util.js';

const listMessages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const listNames = ['Тимофей', 'Вера', 'Родион', 'Даниил', 'Михаил', 'Илья', 'Аделина', 'Арсений', 'Александра', 'Иван', 'Дарья', 'Роман', 'Александр', 'Ксения', 'Марк', 'Никита', 'Екатерина', 'София', 'Глеб', 'Кира'];

const listPhotoDescriptions = ['Пляж у озера', 'Указатель', 'Вид на песчаный пляж', 'Девушка в купальнике', 'Рагу с веселым рисом', 'Черная машина', 'Клубника на тарелке', 'Клюквенный морс', 'Самолет над пляжем', 'Обувница', 'Тропинка к пляжу', 'Белая машина', 'Рыба с овощами', 'Кото-ролл', 'Космические домашние тапочки', 'Вид на горы из иллюминатора', 'Хор', 'Красная машина', 'Тапочки с подсветкой', 'Площадь с пальмами', 'Салат', 'Пляж на закате', 'Краб', 'Концерт', 'Переправа'];

/**
 * Функция создания списка сообщений к фотографии
 * @param {object} - массив данных
 * @returns {object} commentsUser - массив объеков в виде комментариев к фото
 */
function generateComment() {
  return Array.from({length: getRandomInteger(0, 30)}, () => {
    const commentUser = {
      id: +String(Math.random()).replace(/^0+/, '').replace('.', ''),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: elementFromArray(listMessages),
      name: elementFromArray(listNames),
    };
    return commentUser;
  });
}

/**
 * Функция для генерации случайного объекта
 * @param {object} [] - массив данных пользователя
 * @returns {object} [] - массив объектов
 */
function generateRandomPhoto(index) {
  return {
    id: index,
    url: `photos/${index}.jpg`,
    description: listPhotoDescriptions[index - 1],
    likes: getRandomInteger(15, 200),
    comments: generateComment(),
  };
}

/**
 * Создание массива из 25 сгенерированных объектов
 * @param {number} 25 - количество выведенных объектов
 * @param {function} generateRandomPhoto - функция для генерации случайного объекта
 * @returns {object} arrayData - массив объектов
 */
const generatePhotos = (count) => Array.from({length: count}, (_, index) => generateRandomPhoto(++index));

export {generatePhotos};
