import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '38308100-c8bfe7ecfd47e0eeb8c400dc4';

export const fetchImages = async (query, page) => {
  const slicedQuery = query.slice(query.indexOf('/') + 1);
  const response = await axios.get(
    `?q=${slicedQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};

