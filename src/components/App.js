import React, { useEffect, useState,useCallback } from 'react';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Loader } from './loader/Loader';
import { Button } from './button/Button';

import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from './Fetch';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loader, setLoader] = useState(false);

 

  const createMarkup = useCallback(async () => {
    const perPage = 12;

    try {
      setLoader(true);

      const data = await fetchImages(query, page);
      const array = await data.hits.map(
        ({ id, webformatURL, largeImageURL }) => {
          return { id, webformatURL, largeImageURL };
        }
      );
      if (data.hits.length === 0) {
        toast.dismiss();
        toast.info('Image was not found...', {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }

      setImages(prevState => [...prevState, ...array]);
      setLoader(false);

      setTotalPages(Math.ceil(data.totalHits / perPage));
    } catch (error) {
      toast.info('oh sorry try again later', {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setLoader(false);
    }
  },[query, page])

  const changeQuery = newQuery => {
    setQuery(`${Date.now()}/${newQuery}`);
    setImages([]);
    setPage(1);
  };
  const handleLoadMore = () => setPage(prevState => prevState + 1);

  useEffect(() => {
    if (query === '') {
      return;
    }
    createMarkup();
  }, [query, page,createMarkup]);

  return (
    <>
      <ToastContainer transition={Slide} />

      <Searchbar changeQuery={changeQuery} />

      <ImageGallery images={images} />

      {loader && <Loader />}

      {images.length > 0 && totalPages !== page && !loader && (
        <Button loadMore={handleLoadMore} />
      )}
    </>
  );
};
