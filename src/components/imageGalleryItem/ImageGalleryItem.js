import React from 'react';
import { useState } from 'react';
import { CustomModal } from '../modal/Modal';
import { GalleryListImage } from './StyledGalleryItem';
export const ImageGalleryItem = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setIsLoadingImage(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleImageLoad = () => setIsLoadingImage(false);

  const handleImageError = () => {
    setIsLoadingImage(false);
    console.error('Error loading image');
  };

  return (
    <>
      <GalleryListImage
        onClick={openModal}
        src={image.webformatURL}
        alt=""
      ></GalleryListImage>
      <CustomModal
        isOpen={isModalOpen}
        onModalClose={closeModal}
        isLoadingImage={isLoadingImage}
        image={image.largeImageURL}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </>
  );
};
