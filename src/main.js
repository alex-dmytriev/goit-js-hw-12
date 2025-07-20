import iziToast from 'izitoast';
import { getPhotos } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  showLoader,
} from './js/render-functions';

//--- References ---
export const refs = {
  formEl: document.querySelector('.form'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  loaderEl: document.querySelector('.loader'),
};

//--- Handlers ---
// Search query validaton
async function onSubmit(event) {
  event.preventDefault();
  clearGallery();

  const searchQuery = event.target.elements['search-text'].value.trim();
  if (!searchQuery) {
    return iziToast.error({
      message: 'Empty request. Try again!',
      position: 'topRight',
    });
  }
  showLoader();

  // Server response processing & gallery markup insertion
  try {
    const respData = await getPhotos(searchQuery);
    const hits = respData.hits;

    if (hits.length === 0) {
      return iziToast.error({
        message:
          'Sorry there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    }

    createGallery(hits);

    const totalHits = respData.totalHits;
    console.log(totalHits);
    // if (TotalHits > per_page) {
    // }
  } catch (err) {
    iziToast.error({
      message: err.message,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }

  event.target.reset();
  console.count('Form submitted');
}

// Load more logic
async function onClickLoadMoreBtn(e) {}

//--- Event Listeners ---
refs.formEl.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onClickLoadMoreBtn);
