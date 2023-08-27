import React, { Component } from 'react';
import { CustomModal } from '../modal/Modal';
import { GalleryListImage } from './StyledGalleryItem';
export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
    isLoadingImage: false,
  };
   openModal = () => {
    this.setState({ isModalOpen: true,isLoadingImage: true,  });
};
    closeModal = () => this.setState({ isModalOpen: false });
    
    handleImageLoad = () => {
      this.setState({ isLoadingImage: false });
    };
  
    handleImageError = () => {
      this.setState({ isLoadingImage: false });
      console.error('Error loading image');
    };

  render() {
    const {image}=this.props;
    const { isLoadingImage, isModalOpen } = this.state;
    return (
      <>
       <GalleryListImage onClick={this.openModal} src={image.webformatURL} alt=''></GalleryListImage>
       <CustomModal 
       isOpen={isModalOpen}
       onModalClose={this.closeModal}
       isLoadingImage={isLoadingImage}
       image={image.largeImageURL}
       afterOpen={this.afterOpen}
        onLoad={this.handleImageLoad}
       />
      </>

   
    )
  }
}
