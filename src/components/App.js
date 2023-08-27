import React, { Component } from 'react';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Loader } from './loader/Loader';
import { Button } from './button/Button';

import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from './Fetch';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    totalPages: 0,
    error: null,
    loader: false,
  };
  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.createMarkup();
    }
  }

  createMarkup = async () => {
    const { query, page } = this.state;
    const perPage = 12;

    try {
      this.setState({ loader: true });

      const data = await fetchImages(query, page);
      const array = await data.hits.map(
        ({ id, webformatURL, largeImageURL,previewURL }) => {
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
      this.setState(state => ({
        images: [...state.images, ...array],
        isLoading: false,
        error: '',
        totalPages: Math.ceil(data.totalHits / perPage),
      }));
      console.log(data.hits.length);
    } catch (error) {
      this.setState({ error: 'error' }); 
    } finally {
      this.setState({ loader: false }); 
    }
  };

  changeQuery = newQuery => {
    this.setState({
      query: `${Date.now()}/${newQuery}`,
      images: [],
      page: 1,
    });
  };
  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, page, totalPages, loader } = this.state;

    return (
      <>
        <ToastContainer transition={Slide} />

        <Searchbar changeQuery={this.changeQuery} />

        <ImageGallery images={images} />

        {loader && <Loader />}

        {images.length > 0 && totalPages !== page && !loader && (
          <Button loadMore={this.handleLoadMore} />
        )}
      </>
    );
  }
}
