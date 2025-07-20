import SimpleLightbox from 'simplelightbox';
import { refs } from '../main';

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
  refs.galleryEl.insertAdjacentHTML('beforeend', dynamicMarkup);
  simpleGallery.refresh();
}

// Utilities
export function clearGallery() {
  refs.galleryEl.innerHTML = '';
}

export function showLoader() {
  refs.loaderEl.classList.remove('is-hidden');
}

export function hideLoader() {
  refs.loaderEl.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  refs.loadMoreBtn.classList.add('is-hidden');
}
