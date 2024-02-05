import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

const CustomModal = ({ isOpen, onClose, title, paragraph, buttonText, buttonHref }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} shouldCloseOnEsc={true} className="custom-modal" overlayClassName="custom-modal-overlay">
      <button className="cerrar_modal" onClick={onClose}>x</button>
      <div className="contenedor_modal">
        <h1 className='title_modal'>{title}</h1>
        <p className='paragraph_modal'>{paragraph}</p>
        {buttonText && buttonHref && (
          <Link className='button_modal' style={{textDecoration:'none'}} to={buttonHref}>
            {buttonText}
          </Link>
        )}
      </div>
    </Modal>
  );
};

export default CustomModal;
