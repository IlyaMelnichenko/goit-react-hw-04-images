import React from 'react';
import Modal from 'react-modal';
import { Loader } from '../loader/Loader';
import {   StyledModalImg } from './StyledModal';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width:'800px',
    height: '450px',
    overflowY: 'hidden',
    display:'flex',
    justifyContent: 'center',
    alignItems:'center'
    
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999, 
  },
};
Modal.setAppElement('#root');

export const CustomModal = ({
  isOpen,
  onModalClose,
  isLoadingImage,
  image,
  afterOpen,
  onLoad,
  onError
}) => {
  return (
    <Modal  onAfterOpen={afterOpen} isOpen={isOpen} onRequestClose={onModalClose} style={customStyles}>
      {isLoadingImage && <Loader />}  
      <StyledModalImg   onLoad={onLoad} onError={onError} src={image} alt="" $isLoadingImage={isLoadingImage} />
    </Modal>
  );
};
