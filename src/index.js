import FethApiServes from './url';
import cards from './templates/cards.hbs';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

Notiflix.Notify.init({
  width: '400px',
  position: 'right-top',
  distance: '10px',
  borderRadius: '50px',
  timeout: 3000,
});

const options = {
  root: null,
  rootMargin: '200px',
  threshold: 1,
};

const observer = new IntersectionObserver(updateList, options);
const newApiServer = new FethApiServes();

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
// const clickBtn = document.querySelector('.load-more'); //btn load-more
const btnSubmit = document.querySelector('button[type="submit"]');
const jsGuard = document.querySelector('.js-guard');
disabledBtnSearch();

searchForm.addEventListener('submit', startScript);
// clickBtn.addEventListener('click', httpsRequest); //btn load-more

function startScript(e) {
  disabledBtnSearch();
  e.preventDefault();

  // clickBtn.classList.remove('is-hiden'); //btn load-more
  removeGallery();
  newApiServer.query = e.currentTarget.elements.searchQuery.value;
  newApiServer.resetPege();
  httpsRequest();
  e.target.reset();
  // Notiflix.Notify.success(`Hooray! We found ${newApiServer.valueInput}.`);
}

async function httpsRequest() {
  const ara = await newApiServer.fethApiServes();
  const totalHits = Math.ceil(ara.totalHits / newApiServer.per_page);
  const arr = await ara.hits;
  if (arr.length === 0) {
    Notiflix.Notify.failure(
      `Sorry, there are no ${newApiServer.valueInput} matching your search query. Please try again.`
    );
    return;
  }

  markupGallery(arr);

  if (totalHits === newApiServer.page - 1) {
    Notiflix.Notify.info(
      `We're sorry, but you've reached the end of search results.`
    );
    // clickBtn.classList.add('is-hiden'); //btn load-more
  }
}

function markupGallery(hits) {
  new SimpleLightbox(
    '.gallery a',
    gallery.insertAdjacentHTML('beforeend', cards(hits))
  );
  observer.observe(jsGuard);
}

function removeGallery() {
  gallery.innerHTML = '';
}

function disabledBtnSearch() {
  btnSubmit.setAttribute('disabled', true);
}

searchForm.addEventListener('input', controlBtnDisabled);
function controlBtnDisabled(e) {
  const value = e.currentTarget.searchQuery.value;
  if (value !== '') {
    btnSubmit.removeAttribute('disabled');
    return;
  } else {
    disabledBtnSearch();
  }
}

function updateList(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting === true) {
      httpsRequest();
    }
  });
}
