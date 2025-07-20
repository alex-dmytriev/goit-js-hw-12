import SimpleLightbox from 'simplelightbox';

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');

const simpleGallery = new SimpleLightbox('.gallery a');

export function createGallery(images) {
  const dynamicMarkup = images
    .map(
      item =>
        `<li><a class="img-link" href="${item.largeImageURL}"><img src="${item.webformatURL}" alt="${item.tags}" width="360" height="200"><ul class="img-meta">
      <li class="meta-list-item"><span class="meta-item-title">Likes</span> ${item.likes}</li>
      <li class="meta-list-item"><span class="meta-item-title">Views</span> ${item.views}</li>
      <li class="meta-list-item"><span class="meta-item-title">Comments</span> ${item.comments}</li>
      <li class="meta-list-item"><span class="meta-item-title">Downloads</span> ${item.downloads}</li>
      </ul>
      </a>
      </li>`
    )
    .join('');
  galleryEl.innerHTML = dynamicMarkup;
  simpleGallery.refresh();
}

// Utilities
export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoader() {
  loaderEl.classList.remove('is-hidden');
}

export function hideLoader() {
  loaderEl.classList.add('is-hidden');
}

export function showLoadMoreButton() {}

export function hideLoadMoreButton() {}
