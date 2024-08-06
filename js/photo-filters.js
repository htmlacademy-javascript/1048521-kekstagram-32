const COUNT_RENDERED_PHOTOS = 25;
const filterDefault = document.querySelector('#filter-default');
const filterDiscussed = document.querySelector('#filter-discussed');
const filterRandom = document.querySelector('#filter-random');

const getRankPhotos = (wizard) => wizard.comments.length;
const getRandomPhotos = (photos) => {
  const x = photos.slice().sort(() => 0.5 - Math.random());
  return x.slice(0, 10);
};

const comparePhotos = (photoA, photoB) => {
  const rankA = getRankPhotos(photoA);
  const rankB = getRankPhotos(photoB);
  return rankB - rankA;
};

const setDefaultClick = (photos, cb) => {
  filterDefault.addEventListener('click', () => {
    filterDefault.classList.toggle('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    // console.log(photos.slice(0, COUNT_RENDERED_PHOTOS));
    cb(photos.slice(0, COUNT_RENDERED_PHOTOS));
  });
};

const setRandomClick = (photos, cb) => {
  filterRandom.addEventListener('click', () => {
    filterRandom.classList.toggle('img-filters__button--active');
    filterDefault.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    // console.log(getRandomPhotos(photos));
    cb(getRandomPhotos(photos));
  });
};

const setDiscussedClick = (photos, cb) => {
  filterDiscussed.addEventListener('click', () => {
    filterDiscussed.classList.toggle('img-filters__button--active');
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    // console.log(photos.slice().sort(comparePhotos));
    cb(photos.slice().sort(comparePhotos));
  });
};

export {setDefaultClick, setRandomClick, setDiscussedClick};
