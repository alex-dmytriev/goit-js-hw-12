import axios from 'axios';

export async function getPhotos(query, page = 1, perPage = 15) {
  const ENDPOINT = 'https://pixabay.com/api/';
  const API_KEY = '51376542-95e34f1d639dab3c27f4a47b0';

  const queryParams = new URLSearchParams({
    q: query,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: perPage,
    page: page,
  });

  try {
    const respData = await axios.get(`${ENDPOINT}?${queryParams}`);
    return respData.data;
  } catch (err) {
    throw err;
  }
}
