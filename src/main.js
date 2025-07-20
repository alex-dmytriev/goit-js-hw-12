import iziToast from 'izitoast';
import { getPhotos } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  showLoader,
} from './js/render-functions';

// References
const formEl = document.querySelector('.form');

// Handlers
async function onSubmit(event) {
  event.preventDefault();
  clearGallery();

  const searchQuery = event.target.elements['search-text'].value.trim();
  if (!searchQuery) {
    return iziToast.error({
      message: 'Empty request. Try again!',
      position: 'topRight',
    });
  } else {
    showLoader();

    try {
      const respData = await getPhotos(searchQuery);

      if (respData.length === 0) {
        return iziToast.error({
          message:
            'Sorry there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      }

      createGallery(respData);
    } catch (err) {
      iziToast.error({
        message: err.message,
        position: 'topRight',
      });
    } finally {
      hideLoader();
      ``;
    }

    event.target.reset();
  }
}

// Event Listeners
formEl.addEventListener('submit', onSubmit);
