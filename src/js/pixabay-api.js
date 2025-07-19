import axios from 'axios';

export function getPhotos(query) {
  const ENDPOINT = 'https://pixabay.com/api/';
  const API_KEY = '51376542-95e34f1d639dab3c27f4a47b0';

  const queryParams = new URLSearchParams({
    q: query,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horisontal',
    safesearch: true,
    per_page: 27,
  });

  return axios.get(`${ENDPOINT}?${queryParams}`);
}
