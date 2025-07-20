import iziToast from 'izitoast';
import { getPhotos } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  hideLoadMoreButton,
  showLoader,
  showLoadMoreButton,
} from './js/render-functions';

//--- References ---
export const refs = {
  formEl: document.querySelector('.form'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  loaderEl: document.querySelector('.loader'),
  per_page: 15, // Per page value for pixabay-api and show 'Load more' button logic
};

//--- Global Variables ---
let currentSearchQuery = '';
let currentPage = 1;
let maxPageCount = 1;

//--- Handlers ---
// Search query validaton
async function onSubmit(event) {
  event.preventDefault();
  clearGallery();
  let respData = null; // onSubmit scope availability for respData

  const searchQuery = event.target.elements['search-text'].value.trim();
  if (!searchQuery) {
    return iziToast.error({
      message: 'Empty request. Try again!',
      position: 'topRight',
    });
  }
  currentSearchQuery = searchQuery; // Assign validated search query value to the global variable;

  hideLoadMoreButton();
  showLoader();

  // Server response processing & gallery markup insertion
  currentPage = 1; // reset page counter for a new submit
  try {
    respData = await getPhotos(searchQuery, currentPage);
    const hits = respData.hits;

    if (hits.length === 0) {
      return iziToast.error({
        message:
          'Sorry there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    }

    createGallery(hits);
  } catch (err) {
    iziToast.error({
      message: err.message,
      position: 'topRight',
    });
  } finally {
    hideLoader();
    // Check if there is more images to show on the next page
    maxPageCount = Math.ceil(respData.totalHits / refs.per_page);

    if (respData.totalHits > refs.per_page) {
      showLoadMoreButton();
    }
  }

  event.target.reset();
}

// Load more button logic
async function onClickLoadMoreBtn() {
  hideLoadMoreButton();
  showLoader();

  currentPage += 1;

  try {
    const respNextData = await getPhotos(currentSearchQuery, currentPage);
    const nextHits = respNextData.hits;

    createGallery(nextHits);
    // Scroll behaviour //
    const galleryItemEl = document.querySelector('.gallery li');
    const galleryItemHeight = galleryItemEl.getBoundingClientRect().height;
    window.scrollBy({
      top: galleryItemHeight * 2,
      left: 0,
      behavior: 'smooth',
    });
    // End of scroll behaviour
  } catch (err) {
    iziToast.error({ message: err.message, position: 'topRight' });
  } finally {
    hideLoader();

    if (currentPage >= maxPageCount) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  }
}

//--- Event Listeners ---
refs.formEl.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onClickLoadMoreBtn);
