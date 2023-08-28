import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '38308100-c8bfe7ecfd47e0eeb8c400dc4';

export const fetchImages = async (query, page,controllerRef) => {
  if(controllerRef.current){
    controllerRef.current.abort();
    console.log(controllerRef.current.signal)

  }
  controllerRef.current= new AbortController();
  const slicedQuery = query.slice(query.indexOf('/') + 1);
  const response = await axios.get(
    `?q=${slicedQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,{
      signal:controllerRef.current.signal,
    }
  );
  return response.data;
};

